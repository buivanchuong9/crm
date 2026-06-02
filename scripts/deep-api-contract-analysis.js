const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REPO = path.resolve(ROOT, "..");
const OUT = path.join(REPO, "docs", "api-contract");

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function walk(dir, exts, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const file = path.join(dir, name);
    const stat = fs.statSync(file);
    if (stat.isDirectory()) walk(file, exts, out);
    else if (exts.some((ext) => file.endsWith(ext))) out.push(file);
  }
  return out;
}

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, "/");
}

function csvEscape(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function table(rows, headers) {
  const head = `| ${headers.join(" | ")} |`;
  const sep = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${headers.map((h) => String(row[h] ?? "").replace(/\n/g, "<br>")).join(" | ")} |`);
  return [head, sep, ...body].join("\n");
}

function parseRoutes() {
  const src = read(path.join(ROOT, "src", "app", "routes.tsx"));
  const importMap = {};
  for (const m of src.matchAll(/const\s+(\w+)\s*=\s*React\.lazy\(\(\)\s*=>\s*import\("([^"]+)"\)\)/g)) {
    importMap[m[1]] = m[2];
  }
  const routes = [];
  for (const m of src.matchAll(/path:\s*([^,\n]+),\s*\n\s*component:\s*<(\w+)/g)) {
    const routeExpr = m[1].trim();
    const component = m[2].trim();
    const importPath = importMap[component] || "";
    const routeKey = routeExpr.replace(/^urls\./, "");
    routes.push({
      screen: component,
      routeExpr,
      routeKey,
      route: routeExpr === '""' ? "/" : routeExpr,
      component,
      importPath,
      file: importPath ? `src/${importPath.replace(/^pages\//, "pages/")}.tsx` : "",
    });
  }
  return routes;
}

function parseServices() {
  const files = walk(path.join(ROOT, "src", "services"), [".ts", ".tsx", ".js", ".jsx"]);
  const calls = [];
  for (const file of files) {
    const src = read(file);
    const service = path.basename(file).replace(/\.(tsx?|jsx?)$/, "");
    const fnRegex = /([A-Za-z0-9_]+)\s*:\s*(?:async\s*)?\(([^)]*)\)\s*=>/g;
    let fn;
    while ((fn = fnRegex.exec(src))) {
      const start = fn.index;
      const next = src.slice(fnRegex.lastIndex).search(/\n\s*[A-Za-z0-9_]+\s*:\s*(?:async\s*)?\(/);
      const block = src.slice(start, next >= 0 ? fnRegex.lastIndex + next : Math.min(src.length, start + 6000));
      for (const m of block.matchAll(/fetch\(([^,]+),\s*\{([\s\S]*?)\}\)/g)) {
        const method = (m[2].match(/method:\s*["']([^"']+)["']/) || [])[1] || "GET";
        const body = (m[2].match(/body:\s*([^,\n}]+)/) || [])[1] || "";
        calls.push({
          service,
          function: fn[1],
          params: fn[2].replace(/\s+/g, " ").trim(),
          method,
          urlRef: m[1].replace(/\s+/g, " ").trim(),
          body,
          file: rel(file),
        });
      }
      for (const m of block.matchAll(/uploadFile\(([^,\)]+)/g)) {
        calls.push({
          service,
          function: fn[1],
          params: fn[2].replace(/\s+/g, " ").trim(),
          method: "UPLOAD",
          urlRef: m[1].trim(),
          body: "FormData",
          file: rel(file),
        });
      }
    }
  }
  return calls;
}

function urlKeyFromRef(ref) {
  const m = ref.match(/urlsApi\.([A-Za-z0-9_]+)\.([A-Za-z0-9_]+)/);
  return m ? `${m[1]}.${m[2]}` : "";
}

function serviceModule(service) {
  return service.replace(/Service$/, "").replace(/IdApi$/, "").replace(/^Crm/, "CRM");
}

function parseUrlRegistry() {
  const src = read(path.join(ROOT, "src", "configs", "urls.ts"));
  const lines = src.split(/\n/);
  const stack = [];
  const urls = {};
  for (const line of lines) {
    const obj = line.match(/^\s*([A-Za-z0-9_]+):\s*\{\s*$/);
    if (obj) {
      stack.push(obj[1]);
      continue;
    }
    const kv = line.match(/^\s*([A-Za-z0-9_]+):\s*(.+?),?\s*$/);
    if (kv && stack.length) {
      const expr = kv[2].replace(/,\s*$/, "").trim();
      if (!expr.includes("{")) urls[`${stack.join(".")}.${kv[1]}`] = expr;
    }
    if (/^\s*\},?\s*$/.test(line) && stack.length) stack.pop();
  }
  return urls;
}

function parsePageUsage(routes) {
  const pageFiles = walk(path.join(ROOT, "src", "pages"), [".ts", ".tsx"]);
  const byFile = {};
  for (const file of pageFiles) {
    const src = read(file);
    const imports = [...src.matchAll(/import\s+([A-Za-z0-9_]+)\s+from\s+["']services\/([^"']+)["']/g)].map((m) => ({
      local: m[1],
      service: path.basename(m[2]).replace(/\.(tsx?|jsx?)$/, ""),
    }));
    const used = [];
    for (const imp of imports) {
      const re = new RegExp(`${imp.local}\\.([A-Za-z0-9_]+)`, "g");
      for (const m of src.matchAll(re)) used.push({ service: imp.service, function: m[1] });
    }
    const buttons = [];
    const buttonWords = ["Create", "Add", "Edit", "Delete", "Save", "Approve", "Reject", "Assign", "Export", "Import", "Upload", "Download", "Update", "Cancel", "Search", "Filter"];
    for (const word of buttonWords) {
      const re = new RegExp(word, "ig");
      if (re.test(src)) buttons.push(word);
    }
    const forms = [...src.matchAll(/useState(?:<[^>]+>)?\((\{[\s\S]*?\})\)/g)].slice(0, 8).map((m) => m[1].replace(/\s+/g, " ").slice(0, 300));
    const tableHints = {
      hasAgGrid: /AgGrid|ag-grid|GridConfig|columnDefs|BoxTable|DataGrid/i.test(src),
      hasPagination: /pageSize|pageIndex|pageNumber|pagination|total/i.test(src),
      hasSearch: /keyword|search|SearchBox|onSearch/i.test(src),
      hasFilter: /filter|Filter/i.test(src),
      hasSort: /sort|Sort/i.test(src),
    };
    byFile[rel(file)] = { used, buttons: [...new Set(buttons)], forms, tableHints };
  }
  return routes.map((r) => {
    const exact = r.file && byFile[r.file] ? r.file : "";
    let usage = exact ? byFile[exact] : null;
    if (!usage && r.importPath) {
      const prefix = `src/${r.importPath.replace(/^pages\//, "pages/").replace(/\/[^/]+$/, "")}`;
      const matches = Object.entries(byFile).filter(([f]) => f.startsWith(prefix));
      usage = {
        used: matches.flatMap(([, v]) => v.used),
        buttons: [...new Set(matches.flatMap(([, v]) => v.buttons))],
        forms: matches.flatMap(([, v]) => v.forms).slice(0, 12),
        tableHints: {
          hasAgGrid: matches.some(([, v]) => v.tableHints.hasAgGrid),
          hasPagination: matches.some(([, v]) => v.tableHints.hasPagination),
          hasSearch: matches.some(([, v]) => v.tableHints.hasSearch),
          hasFilter: matches.some(([, v]) => v.tableHints.hasFilter),
          hasSort: matches.some(([, v]) => v.tableHints.hasSort),
        },
      };
    }
    return { ...r, ...(usage || { used: [], buttons: [], forms: [], tableHints: {} }) };
  });
}

function parseBackendRoutes() {
  const files = walk(path.join(REPO, "be", "src"), [".ts"]);
  const routes = [];
  for (const file of files) {
    const src = read(file);
    const controller = (src.match(/@Controller\(['"]([^'"]*)['"]\)/) || [])[1];
    if (controller === undefined) continue;
    const className = (src.match(/export\s+class\s+(\w+)/) || [])[1] || path.basename(file);
    const methodRegex = /@(Get|Post|Put|Patch|Delete)\(['"]([^'"]*)['"]\)[\s\S]*?(?:async\s+)?([A-Za-z0-9_]+)\s*\(/g;
    let m;
    while ((m = methodRegex.exec(src))) {
      const method = m[1].toUpperCase();
      const sub = m[2];
      const full = `/${[controller, sub].filter(Boolean).join("/")}`.replace(/\/+/g, "/");
      routes.push({ method, path: full, controller: className, handler: m[3], file: path.relative(REPO, file).replace(/\\/g, "/") });
    }
  }
  return routes;
}

function normalizePathFromExpr(expr, urls) {
  const key = urlKeyFromRef(expr);
  const value = key ? urls[key] : "";
  if (!value) return "";
  const literals = [...value.matchAll(/"([^"]+)"|'([^']+)'/g)].map((m) => m[1] || m[2]);
  const suffix = literals.find((s) => s.startsWith("/")) || "";
  const prefix = value.includes("prefixBpm") ? "/bpmapi" : value.includes("prefixAdmin") ? "/adminapi" : value.includes("prefixApi") ? "/api" : value.includes("prefixAuthenticator") ? "/authenticator" : value.includes("prefixNotification") ? "/notification" : "";
  return `${prefix}${suffix}`.replace(/\/+/g, "/");
}

function inferDto(call) {
  const params = call.params || "";
  const body = call.body || "";
  const fields = [];
  if (/body|params|data|item|formData/i.test(params + body)) {
    fields.push({ name: "id", type: "number|string", required: /detail|delete|get/i.test(call.function), nullable: true, validation: "Required for update/delete/detail" });
    fields.push({ name: "name|title|code", type: "string", required: /update|create|save/i.test(call.function), nullable: true, validation: "Screen-specific required fields; trim string; max length per DB" });
    fields.push({ name: "status|active|isActive", type: "number|boolean", required: /status|active/i.test(call.function), nullable: true, validation: "Enum/status values must match frontend options" });
    fields.push({ name: "pageIndex|pageSize|keyword", type: "number|string", required: /list|filter|search/i.test(call.function), nullable: true, validation: "Pagination/filter query params" });
  }
  return fields;
}

function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const routes = parseRoutes();
  const calls = parseServices();
  const urls = parseUrlRegistry();
  const screens = parsePageUsage(routes);
  const beRoutes = parseBackendRoutes();
  const beSet = new Set(beRoutes.map((r) => `${r.method} ${r.path}`));
  const callsWithPath = calls.map((c) => ({ ...c, urlKey: urlKeyFromRef(c.urlRef), path: normalizePathFromExpr(c.urlRef, urls) }));
  const byServiceFn = new Map(callsWithPath.map((c) => [`${c.service}.${c.function}`, c]));

  const screenRows = [];
  for (const s of screens) {
    const apis = [];
    for (const u of s.used) {
      const call = byServiceFn.get(`${u.service}.${u.function}`);
      if (call) apis.push(call);
    }
    const unique = [...new Map(apis.map((a) => [`${a.method} ${a.path || a.urlRef}`, a])).values()];
    const blocking = unique.filter((a) => /list|detail|get|info|select|count|filter/i.test(a.function)).slice(0, 8);
    screenRows.push({
      Screen: s.screen,
      Route: s.routeExpr,
      Components: s.importPath,
      "Required APIs": unique.map((a) => `${a.method} ${a.path || a.urlRef} (${a.service}.${a.function})`).join("<br>"),
      "Optional APIs": unique.filter((a) => /delete|export|import|upload|download|send|parser/i.test(a.function)).map((a) => `${a.method} ${a.path || a.urlRef}`).join("<br>"),
      "Blocking APIs": blocking.map((a) => `${a.method} ${a.path || a.urlRef}`).join("<br>"),
    });
  }

  const buttonRows = [];
  const verbs = [
    ["Create", /create|add|insert|update/i],
    ["Edit", /detail|get|update/i],
    ["Delete", /delete/i],
    ["Save", /update|save|create/i],
    ["Approve", /approve|approval/i],
    ["Reject", /reject/i],
    ["Assign", /assign|employee|sale|viewer/i],
    ["Export", /export|download/i],
    ["Import", /import|upload/i],
    ["Upload", /upload|file|image/i],
    ["Download", /download|export/i],
  ];
  for (const s of screens) {
    const screenCalls = s.used.map((u) => byServiceFn.get(`${u.service}.${u.function}`)).filter(Boolean);
    for (const [button, re] of verbs) {
      const matches = screenCalls.filter((c) => re.test(c.function) || re.test(c.urlKey));
      if (!matches.length && !s.buttons.some((b) => new RegExp(button, "i").test(b))) continue;
      for (const c of matches.length ? matches : [{ method: "TBD", path: "No direct service call detected", service: "", function: "", params: "", body: "" }]) {
        buttonRows.push({
          Screen: s.screen,
          Button: button,
          "API Called": `${c.method} ${c.path || c.urlRef}`,
          "Request Payload": c.method === "GET" || c.method === "DELETE" ? `Query params from ${c.params || "id/filter"}` : c.body || "JSON body",
          "Response Payload": "{ code: 0, result: object|array|pagedResult, message?: string }",
          "Validation Rules": "Required fields validated in modal/form; BE must revalidate required, enum, ownership, tenant, duplicate code/name.",
          "Permission Required": `Permission code from menu/action for ${s.routeKey}; enforce JWT + Selectedrole.`,
          "Error Cases": "401, 403, 404 id not found, 409 duplicate/in use, 422 validation, 500 integration failure.",
          "Loading Behavior": "Button/modal/table shows loading while Promise pending; toast on non-zero code/message.",
        });
      }
    }
  }

  const dtoRows = callsWithPath.map((c) => ({
    Module: serviceModule(c.service),
    Service: c.service,
    Function: c.function,
    Endpoint: `${c.method} ${c.path || c.urlRef}`,
    "Create DTO": /create|update|save|insert/i.test(c.function) ? "Body DTO: id optional for create, id required for update, business fields from form state." : "",
    "Update DTO": /update|status|active|assign|approve|reject/i.test(c.function) ? "Body DTO or query id + mutable fields/status/action metadata." : "",
    "Detail DTO": /detail|get/i.test(c.function) ? "Query DTO: id required." : "",
    "List DTO": /list|filter|select|search/i.test(c.function) ? "Query DTO: keyword?, pageIndex?, pageSize?, sort?, filters?, status?, date range?." : "",
    "Filter DTO": /filter|dashboard|report|statistic/i.test(c.function) ? "Advanced filter object/query; must accept dynamic attribute conditions where configured." : "",
    Fields: inferDto(c).map((f) => `${f.name}:${f.type}${f.required ? " required" : " optional"}`).join("<br>"),
  }));

  const tableRows = screens.filter((s) => s.tableHints.hasAgGrid || s.tableHints.hasPagination || /List|Report|Dashboard|Setting|Ticket|Warranty|Customer|Contact|Campaign|Kpi|BPM/i.test(s.screen)).map((s) => ({
    Screen: s.screen,
    Route: s.routeExpr,
    Columns: "Defined in page GridConfig/columnDefs/BoxTable. Backend must return fields referenced by row renderers and action columns.",
    Sorting: s.tableHints.hasSort ? "Client sends sort/sortBy/order where present." : "Not explicit; return stable default order.",
    Filtering: s.tableHints.hasFilter ? "Filter modal/query params; support dynamic filters." : "Basic status/date filters if service list accepts params.",
    Search: s.tableHints.hasSearch ? "keyword/search text expected." : "Optional.",
    Pagination: s.tableHints.hasPagination ? "pageIndex/pageSize/total expected." : "Return array or paged result; prefer paged.",
    "Expected Response": "{ code: 0, result: { data|items|content: [], total|totalElements: number, pageIndex, pageSize } } or { code: 0, result: [] }",
    "Example JSON": '{"code":0,"result":{"data":[{"id":1,"name":"Example","status":1}],"total":1,"pageIndex":1,"pageSize":20}}',
  }));

  const uniqueFe = [...new Map(callsWithPath.filter((c) => c.path).map((c) => [`${c.method} ${c.path}`, c])).values()];
  const missing = uniqueFe.filter((c) => !beSet.has(`${c.method === "UPLOAD" ? "POST" : c.method} ${c.path}`));
  const present = uniqueFe.filter((c) => beSet.has(`${c.method === "UPLOAD" ? "POST" : c.method} ${c.path}`));

  const modules = ["Customer", "Contact", "Campaign", "Opportunity", "Ticket", "Warranty", "BPM", "Notification", "Employee", "Role", "Department"];
  const coverageRows = modules.map((module) => {
    const re = new RegExp(module === "BPM" ? "bpm|businessProcess|businessRule|bpmForm|userTask|workOrder" : module, "i");
    const fe = uniqueFe.filter((c) => re.test(c.service) || re.test(c.urlKey) || re.test(c.path));
    const be = fe.filter((c) => beSet.has(`${c.method === "UPLOAD" ? "POST" : c.method} ${c.path}`));
    const pct = (pred) => {
      const need = fe.filter(pred);
      if (!need.length) return "0%";
      return `${Math.round((need.filter((c) => beSet.has(`${c.method === "UPLOAD" ? "POST" : c.method} ${c.path}`)).length / need.length) * 100)}%`;
    };
    const score = fe.length ? Math.round((be.length / fe.length) * 100) : 0;
    return {
      Module: module,
      "FE APIs": fe.length,
      "BE Implemented": be.length,
      "Create %": pct((c) => c.method === "POST" && /create|update|insert|save/i.test(c.function)),
      "Read %": pct((c) => c.method === "GET"),
      "Update %": pct((c) => c.method === "POST" && /update|status|assign|approve|reject|active/i.test(c.function)),
      "Delete %": pct((c) => c.method === "DELETE"),
      "Coverage Score": `${score}%`,
    };
  });

  const md = [];
  md.push("# Deep API Contract Analysis\n");
  md.push("Generated from FE services/routes/pages and current NestJS controllers. This file is intentionally exhaustive at endpoint level; use CSV files for machine-readable matrices.\n");
  md.push("## 1. Screen to API Matrix\n");
  md.push(table(screenRows, ["Screen", "Route", "Components", "Required APIs", "Optional APIs", "Blocking APIs"]));
  md.push("\n## 2. Button to API Matrix\n");
  md.push(table(buttonRows, ["Screen", "Button", "API Called", "Request Payload", "Response Payload", "Validation Rules", "Permission Required", "Error Cases", "Loading Behavior"]));
  md.push("\n## 3. Form DTO Specification\n");
  md.push(table(dtoRows, ["Module", "Service", "Function", "Endpoint", "Create DTO", "Update DTO", "Detail DTO", "List DTO", "Filter DTO", "Fields"]));
  md.push("\n## 4. Table Response Specification\n");
  md.push(table(tableRows, ["Screen", "Route", "Columns", "Sorting", "Filtering", "Search", "Pagination", "Expected Response", "Example JSON"]));
  md.push("\n## 5. Missing Backend APIs\n");
  md.push(table(missing.map((c) => ({ Method: c.method, Path: c.path, Service: c.service, Function: c.function, UrlKey: c.urlKey, File: c.file })), ["Method", "Path", "Service", "Function", "UrlKey", "File"]));
  md.push("\n## 6. Backend Coverage Report\n");
  md.push(table(coverageRows, ["Module", "FE APIs", "BE Implemented", "Create %", "Read %", "Update %", "Delete %", "Coverage Score"]));
  md.push("\n## 7. Swagger Specification\n");
  md.push("See `openapi.generated.yaml`. It contains every FE-required endpoint discovered from service calls, with generic production response envelope schemas. Replace generic request schemas with strict DTOs as each module is implemented.\n");
  md.push("\n## 8. Backend Build Priority\n");
  md.push("- Tier 1: Authentication, Employee, Role, Permission, Notification.\n- Tier 2: Customer, Contact, Campaign, Opportunity.\n- Tier 3: Ticket, Warranty, Workflow/BPM.\n- Tier 4: Reports, KPI, Analytics, Integrations.\n");
  md.push("\n## 9. Frontend Blockers\n");
  md.push(table(screenRows.filter((r) => r["Blocking APIs"]).map((r) => ({ Screen: r.Screen, Route: r.Route, "Blocking APIs": r["Blocking APIs"] })), ["Screen", "Route", "Blocking APIs"]));
  md.push("\n## 10. Recommended Final API Architecture\n");
  md.push("- Keep compatibility facade for legacy FE paths: `/adminapi`, `/api`, `/authenticator`, `/notification`, `/bpmapi`.\n- Put strict domain modules behind facade: identity-access, organization, crm, communication, ticket, warranty, bpm, reporting, integration.\n- Standardize response envelope: `{ code, result, message, errors?, traceId? }`.\n- Standardize list envelope: `{ data, total, pageIndex, pageSize, totalPages? }`.\n- Enforce tenant from `Hostname`, user from JWT, role from `Selectedrole`.\n- Generate OpenAPI from Nest DTOs and compare nightly against `api-inventory.csv`.\n");
  fs.writeFileSync(path.join(OUT, "DEEP_API_CONTRACT_ANALYSIS.md"), md.join("\n"));

  const csvFiles = {
    "screen-api-matrix.csv": screenRows,
    "button-api-matrix.csv": buttonRows,
    "form-dto-spec.csv": dtoRows,
    "table-response-spec.csv": tableRows,
    "missing-backend-apis.csv": missing.map((c) => ({ Method: c.method, Path: c.path, Service: c.service, Function: c.function, UrlKey: c.urlKey, File: c.file })),
    "backend-coverage-report.csv": coverageRows,
    "frontend-api-inventory.csv": uniqueFe.map((c) => ({ Method: c.method, Path: c.path, Service: c.service, Function: c.function, UrlKey: c.urlKey, File: c.file })),
    "backend-routes-current.csv": beRoutes,
  };
  for (const [name, rows] of Object.entries(csvFiles)) {
    const headers = Object.keys(rows[0] || { Empty: "" });
    const body = [headers.map(csvEscape).join(","), ...rows.map((r) => headers.map((h) => csvEscape(r[h])).join(","))].join("\n");
    fs.writeFileSync(path.join(OUT, name), body);
  }

  const paths = {};
  for (const c of uniqueFe) {
    const method = (c.method === "UPLOAD" ? "post" : c.method.toLowerCase());
    if (!paths[c.path]) paths[c.path] = {};
    paths[c.path][method] = {
      summary: `${c.service}.${c.function}`,
      description: `Frontend-required endpoint from ${c.file}. Url key: ${c.urlKey}.`,
      tags: [serviceModule(c.service)],
      security: [{ bearerAuth: [] }],
      parameters: ["get", "delete"].includes(method)
        ? [{ name: "params", in: "query", required: false, schema: { type: "object", additionalProperties: true } }]
        : undefined,
      requestBody: ["post", "put", "patch"].includes(method)
        ? { required: /update|create|save|insert|assign|approve|reject/i.test(c.function), content: { "application/json": { schema: { type: "object", additionalProperties: true } } } }
        : undefined,
      responses: {
        200: { description: "Success envelope", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiEnvelope" } } } },
        400: { description: "Bad request" },
        401: { description: "Unauthorized" },
        403: { description: "Forbidden" },
        404: { description: "Not found" },
        409: { description: "Conflict" },
        422: { description: "Validation error" },
      },
    };
  }
  const yaml = [
    "openapi: 3.0.3",
    "info:",
    "  title: CRM Frontend Required API Contract",
    "  version: 1.0.0",
    "  description: Generated from CRM FE service layer. Harden DTO schemas during implementation.",
    "servers:",
    "  - url: https://api.example.com",
    "components:",
    "  securitySchemes:",
    "    bearerAuth:",
    "      type: http",
    "      scheme: bearer",
    "      bearerFormat: JWT",
    "  schemas:",
    "    ApiEnvelope:",
    "      type: object",
    "      required: [code, result]",
    "      properties:",
    "        code: { type: integer, example: 0 }",
    "        result: { nullable: true }",
    "        message: { type: string, nullable: true }",
    "        errors: { type: array, items: { type: object }, nullable: true }",
    "        traceId: { type: string, nullable: true }",
    "paths:",
    ...Object.entries(paths).flatMap(([p, methods]) => [
      `  ${p}:`,
      ...Object.entries(methods).flatMap(([m, spec]) => [
        `    ${m}:`,
        `      summary: ${JSON.stringify(spec.summary)}`,
        `      description: ${JSON.stringify(spec.description)}`,
        `      tags: [${spec.tags.map(JSON.stringify).join(", ")}]`,
        "      security:",
        "        - bearerAuth: []",
        ...(spec.parameters ? ["      parameters:", "        - name: params", "          in: query", "          required: false", "          schema:", "            type: object", "            additionalProperties: true"] : []),
        ...(spec.requestBody ? ["      requestBody:", `        required: ${spec.requestBody.required ? "true" : "false"}`, "        content:", "          application/json:", "            schema:", "              type: object", "              additionalProperties: true"] : []),
        "      responses:",
        "        '200':",
        "          description: Success envelope",
        "          content:",
        "            application/json:",
        "              schema:",
        "                $ref: '#/components/schemas/ApiEnvelope'",
        "        '400': { description: Bad request }",
        "        '401': { description: Unauthorized }",
        "        '403': { description: Forbidden }",
        "        '404': { description: Not found }",
        "        '409': { description: Conflict }",
        "        '422': { description: Validation error }",
      ]),
    ]),
  ].join("\n");
  fs.writeFileSync(path.join(OUT, "openapi.generated.yaml"), yaml);

  console.log(JSON.stringify({
    screens: screenRows.length,
    buttons: buttonRows.length,
    serviceCalls: calls.length,
    uniqueFrontendApis: uniqueFe.length,
    backendRoutes: beRoutes.length,
    missingBackendApis: missing.length,
    presentBackendApis: present.length,
    output: OUT,
  }, null, 2));
}

main();

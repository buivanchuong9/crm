/* eslint-disable prefer-const */
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import moment from "moment";
import { IUser } from "model/user/UserResponseModel";
import { getDomain } from "reborn-util";
import { getRootDomain } from "utils/common";

import "./index.scss";

export default function Index() {
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isLoginMode = useMemo(() => mode === "login", [mode]);

  const handleMockAuth = (mode: "login" | "register") => {
    const sourceDomain = getDomain(decodeURIComponent(document.location.href));
    const rootDomain = getRootDomain(sourceDomain);
    const dateExpires = moment().add(7, "days").toDate();
    const mockUser = {
      id: 1,
      name: "Mock User",
      phone: "0369062042",
      avatar: "",
      gender: 0,
      role: "mock",
    } as IUser;

    setCookie("token", "mock-token", { path: "/", domain: rootDomain, expires: dateExpires });
    setCookie("user", JSON.stringify(mockUser), { path: "/", domain: rootDomain, expires: dateExpires });
    localStorage.setItem("permissions", "{}");
    localStorage.setItem("user.root", "1");
    localStorage.setItem("auth.mode", mode);
    navigate("/customer");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleMockAuth(mode);
  };

  return (
    <div className="login">
      <div className="login-shell">
        <section className={`login-hero ${isLoginMode ? "is-login" : "is-register"}`}>
          <div className="login-hero__brand">
            <div className="login-hero__logo">DH</div>
            <div className="login-hero__brand-text">DermaHealth</div>
          </div>
          <div className="login-hero__content">
            {isLoginMode ? (
              <>
                <span className="login-hero__pill">Chuẩn y khoa</span>
                <h2>Công nghệ AI cho làn da khỏe mạnh</h2>
                <p>
                  Phân tích chuyên sâu và giải pháp cá nhân hóa dựa trên dữ liệu lâm sàng thực tế.
                </p>
              </>
            ) : (
              <>
                <h2>Khám phá vẻ đẹp khỏe mạnh từ bên trong.</h2>
                <p>
                  Hành trình chăm sóc da chuyên nghiệp bắt đầu từ đây. Tham gia cộng đồng hơn 50.000 người yêu cái đẹp.
                </p>
              </>
            )}
          </div>
          {!isLoginMode && (
            <div className="login-hero__badge">
              <div className="login-hero__avatars">
                <span />
                <span />
                <span />
              </div>
              <div>
                <div className="login-hero__badge-title">Được tin dùng</div>
                <div className="login-hero__badge-sub">Bởi các chuyên gia da liễu hàng đầu</div>
              </div>
            </div>
          )}
        </section>

        <section className="login-panel">
          <div className="login-panel__brand">
            <div className="login-panel__logo">DH</div>
            <div className="login-panel__brand-text">DermaHealth</div>
          </div>
          <h1>{isLoginMode ? "Chào mừng trở lại" : "Tạo tài khoản mới"}</h1>
          <p className="login-panel__subtitle">
            {isLoginMode
              ? "Đăng nhập để tiếp tục hành trình chăm sóc da của bạn."
              : "Bắt đầu hành trình chăm sóc da chuẩn y khoa của bạn ngay hôm nay."}
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            {!isLoginMode && (
              <label className="login-field">
                <span>Họ và tên</span>
                <div className="login-field__control">
                  <span className="login-field__icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2-8 4v2h16v-2c0-2-3.58-4-8-4Z" />
                    </svg>
                  </span>
                  <input type="text" name="fullName" placeholder="Nguyễn Văn A" autoComplete="name" />
                </div>
              </label>
            )}

            <label className="login-field">
              <span>{isLoginMode ? "Email hoặc Số điện thoại" : "Email"}</span>
              <div className="login-field__control">
                <span className="login-field__icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5Z" />
                  </svg>
                </span>
                <input type="email" name="email" placeholder="example@email.com" autoComplete="email" />
              </div>
            </label>

            {!isLoginMode && (
              <label className="login-field">
                <span>Số điện thoại</span>
                <div className="login-field__control">
                  <span className="login-field__icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1v3.51a1 1 0 0 1-1 1A17.92 17.92 0 0 1 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.56 1 1 0 0 1-.25 1.01Z" />
                    </svg>
                  </span>
                  <input type="tel" name="phone" placeholder="090 123 4567" autoComplete="tel" />
                </div>
              </label>
            )}

            <label className="login-field">
              <span>Mật khẩu</span>
              <div className="login-field__control">
                <span className="login-field__icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2Zm-6 0V7a2 2 0 0 1 4 0v2Z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  autoComplete={isLoginMode ? "current-password" : "new-password"}
                />
                <button
                  type="button"
                  className="login-field__toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 5c-5 0-9 5.5-9 7s4 7 9 7 9-5.5 9-7-4-7-9-7Zm0 11a4 4 0 1 1 4-4 4 4 0 0 1-4 4Z" />
                  </svg>
                </button>
              </div>
            </label>

            {!isLoginMode && (
              <label className="login-field">
                <span>Xác nhận mật khẩu</span>
                <div className="login-field__control">
                  <span className="login-field__icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2Zm-6 0V7a2 2 0 0 1 4 0v2Z" />
                    </svg>
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="login-field__toggle"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 5c-5 0-9 5.5-9 7s4 7 9 7 9-5.5 9-7-4-7-9-7Zm0 11a4 4 0 1 1 4-4 4 4 0 0 1-4 4Z" />
                    </svg>
                  </button>
                </div>
              </label>
            )}

            {isLoginMode ? (
              <div className="login-actions">
                <label className="login-checkbox">
                  <input type="checkbox" name="remember" />
                  <span>Ghi nhớ đăng nhập</span>
                </label>
                <button type="button" className="login-link">
                  Quên mật khẩu?
                </button>
              </div>
            ) : (
              <label className="login-checkbox">
                <input type="checkbox" name="policy" />
                <span>
                  Tôi đồng ý với các Điều khoản &amp; Chính sách của DermaHealth.
                </span>
              </label>
            )}

            <button className="login-submit" type="submit">
              {isLoginMode ? "Đăng nhập" : "Đăng ký tài khoản"}
            </button>

            <div className="login-divider">
              <span>{isLoginMode ? "Hoặc đăng nhập với" : "Hoặc đăng ký nhanh bằng"}</span>
            </div>

            <div className="login-social">
              <button type="button" className="social-button" aria-label="Google">
                G
              </button>
              <button type="button" className="social-button" aria-label="Facebook">
                f
              </button>
              <button type="button" className="social-button" aria-label="Apple">
                A
              </button>
            </div>
          </form>

          <div className="login-switch">
            {isLoginMode ? (
              <>
                Chưa có tài khoản?{" "}
                <button type="button" onClick={() => setMode("register")}>Đăng ký ngay</button>
              </>
            ) : (
              <>
                Đã có tài khoản?{" "}
                <button type="button" onClick={() => setMode("login")}>Đăng nhập</button>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

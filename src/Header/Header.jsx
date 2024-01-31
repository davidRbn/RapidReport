import "./Header.scss";

const Header = ({ children, rigthChildren, variant = "" }) => {
  const TitleTag =
    variant === "H2"
      ? "h2"
      : variant === "H3"
      ? "h3"
      : variant === "H1"
      ? "h1"
      : "p";

  return (
    <>
      <div style={{ position: "relative" }}>
        <TitleTag
          className={`title-home-rapports title-home-rapports-${variant}`}
        >
          {children}
        </TitleTag>
        <div className="s-signOut">{rigthChildren}</div>
      </div>
    </>
  );
};

export default Header;

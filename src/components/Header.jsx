function Header() {
  function handleClick() {
    window.location.reload();
  }
  return (
    <header className="app-header" onClick={handleClick}>
      <img className="header-logo" src="quiz-logo.png" alt="logo" />
      <h1>Take Quiz</h1>
    </header>
  );
}

export default Header;

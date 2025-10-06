import "../styles/components/Header.css";

function Header() {
    return (
        <header className="header">
            <h1 className="header__title">HRNet</h1>
            <nav className="header__nav">
                <ul className="header__nav-list">
                    <li className="header__nav-item"><a className="header__nav-link" href="/">Home</a></li>
                    <li className="header__nav-item"><a className="header__nav-link" href="/employee-list">Employee List</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
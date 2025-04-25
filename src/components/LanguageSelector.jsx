import { LANGUAGE_VERSIONS } from "../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <div className="ms-2 mb-4">
      <p className="mb-2 fs-5">Language:</p>
      <div className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          id="languageDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {language}
        </button>
        <ul className="dropdown-menu bg-dark text-light" aria-labelledby="languageDropdown">
          {languages.map(([lang, version]) => (
            <li key={lang}>
              <button
                className={`dropdown-item text-light ${
                  lang === language ? "bg-secondary text-primary" : ""
                }`}
                onClick={() => onSelect(lang)}
              >
                {lang}
                &nbsp;
                <span className="text-muted small">({version})</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LanguageSelector;

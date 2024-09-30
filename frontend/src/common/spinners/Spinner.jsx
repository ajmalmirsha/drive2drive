import "./spinner.css";

export default function Spinner() {
  return (
    <div className="spinner">
      <div class="loader">
        <div class="loader-circle"></div>
        <span class="loader-text">Loading...</span>
      </div>
    </div>
  );
}

import '../css/pages/NotFound.css'

export default function NotFound() {
  return (
    <>
      <h1>
        The page you are trying to reach "{window.location.pathname}" does not exist, or has been
        moved... <br/>Please check your spelling and try again
      </h1>
    </>
  );
}

import {
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiFillGithub,
} from "react-icons/ai";

function Footer() {
  // return <footer className="footer" > <span id="footer_id" >&copy; David Herring 2023</span></footer>;
  return (
    <>
      <footer className="footer">
        <span id="footer_id">&copy; David Herring 2023</span>
        <div className="icon-container">
          <a
            href="https://www.linkedin.com/in/david-herring-051bba241/"
            target="_blank"
            rel="noreferrer"
          >
            <AiFillLinkedin />
          </a>
          <a
            href="https://github.com/davidherring1998"
            target="_blank"
            rel="noreferrer"
          >
            <AiFillGithub className="mid-icon" />
          </a>
          <a
            href="https://twitter.com/DavidHe95802361"
            target="_blank"
            rel="noreferrer"
          >
            <AiFillTwitterCircle />
          </a>
        </div>
      </footer>
    </>
  );
}
export default Footer;

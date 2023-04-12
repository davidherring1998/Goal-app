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
      <span id="footer_id" >&copy; David Herring 2023</span>
        <div className="icon-container">
        <AiFillGithub />
        <AiFillLinkedin className="mid-icon" />
        <AiFillTwitterCircle />
        </div>
      </footer>
    </>
  );
}
export default Footer;

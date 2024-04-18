import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";

export function Footer({ brandName, brandLink, routes }) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 text-black md:justify-between">
        <Typography
          variant="small"
          className="font-normal text-inherit text-white"
        >
          &copy; {year} Hecho por{" "}
          <a
            href={brandLink}
            target="_blank"
            className="text-white transition-colors hover:text-blue-500"
          >
            {brandName}
          </a>{" "}
        </Typography>
        <ul className="flex items-center gap-4"></ul>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  brandName: "Data Predictor",
  brandLink: "",
  routes: [
    { name: "Inicio", path: "/" },

    { name: "Contacto", path: "/contacto" },
  ],
};

Footer.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;

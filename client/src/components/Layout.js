import React from "react";
import { Helmet } from "react-helmet";
import PersistentDrawerLeft from "./Drawer";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <div>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
        </div>
        <title>{title}</title>
      </Helmet>

      <PersistentDrawerLeft />
      <main style={{ minHeight: "80vh" }}>{children}</main>
    </div>
  );
};

Layout.defaultProps = {
  title: "Factory Management app",
  description: "MERN stack project",
  keywords: "mern,react,node,mongodb",
  author: "roy atali",
};

export default Layout;

import React from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
function IndexPage(props) {
  return (
    <>
      <Navbar />
      <section className="flex flex-col items-center mt-32">
        <h1 className="primary-heading text-2xl text-center ">Welcome to Globe Explorer</h1>
        <Link href={'/dashboard'}>
          <button className="pink-button rounded mt-3">Dashbaord</button>
        </Link>
      </section>
    </>
  );
}

export default IndexPage;

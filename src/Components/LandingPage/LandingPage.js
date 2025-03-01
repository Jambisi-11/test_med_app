import React from "react"; // Importing the necessary modules from React library
// import { Link } from "react-router-dom"; // Importing the Link component from react-router-dom library
import "./LandingPage.css"; // Importing the CSS styles for the LandingPage component

// Defining the Function component LandingPage
const LandingPage = () => {
  return (
    <section className="hero-section"> {/* Creating a section with class name 'hero-section' */}
      <div>
        <div data-aos="fade-up" className="flex-hero"> {/* Creating a div with data-aos attribute and class name 'flex-hero' */}
            
            <h1>
            His Fullness<br/>

              <span className="text-gradient">
                
              Health Through Effort,<br /> Healing Through God’s Grace.
              </span>
            </h1>
              <div class="blob-cont"> {/* Creating a div with class name 'blob-cont' */}
                  <div class="blue blob"></div> {/* Creating a blue blob inside the 'blob-cont' div */}
              </div>
              <div class="blob-cont"> {/* Creating another div with class name 'blob-cont' */}
                  <div class="blue1 blob"></div> {/* Creating a different blue blob inside the second 'blob-cont' div */}
              </div>
            <h4>
            The punishment [required] for our well-being fell on Him, 
            And by His stripes (wounds) we are healed. Isaiah 53-5    </h4>
            <a href="#services"> {/* Creating a hyperlink to jump to the 'services' section */}
              <button class="button">Get Started</button> {/* Creating a button with class name 'button' */}
            </a>
            <br /><br />
        </div>
      </div>
    </section>
  );
};

export default LandingPage; // Exporting the LandingPage component to be used in other parts of the application
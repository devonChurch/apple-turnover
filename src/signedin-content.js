import React from "react";
import Thumbnail from "./thumbnail";

const SignedinContent = ({
  currentImage,
  updateImage,
  hero,
  thumbnails,
  placeHolderHero,
  placeHolderThumbanil
}) => (
  <main>
    <div className="container-fluid pt-5">
      <div className="row justify-content-md-center">
        <div className="col col-md-8 col-lg-6">
          <h1 className="display-4">Welcome back,</h1>
          <p>Please select your preferred image.</p>
        </div>
      </div>
    </div>

    {hero && (
      <div className="container-fluid pt-5">
        <div className="row justify-content-md-center">
          <div className="col col-md-10 col-lg-8">
            <img
              src={hero || placeHolderHero}
              style={{ width: "100%" }}
              class="img-fluid img-thumbnail"
              alt={`${currentImage} hero`}
            />
          </div>
        </div>
      </div>
    )}

    <div className="container-fluid pt-5">
      <div className="row justify-content-md-center">
        {Object.keys(thumbnails).map(key => (
          <div className="col-4 col-md-3 col-lg-2">
            <Thumbnail
              source={thumbnails[key] || placeHolderThumbanil}
              altText={`${key} thumbnail`}
              title={key}
              onClick={() => updateImage(key)}
              isSelected={currentImage === key}
            />
          </div>
        ))}
      </div>
    </div>
  </main>
);

export default SignedinContent;

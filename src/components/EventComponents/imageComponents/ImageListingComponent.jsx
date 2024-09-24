import React, { useEffect } from "react";
import GenericImgModal from "./GenericImgModal";
import { Divider, Grid2, Typography } from "@mui/material";

export default function ImageListingComponent({ eventData, setImageAssets }) {

  const imageAssets = eventData?.imageAsset;
  // function checkNullAdditionalAssets() {
  //   if (!imageAssets?.additionalAssets) {
  //     setImageAssets((prev) => ({
  //       ...prev,
  //       imageAsset: {
  //         ...prev?.imageAsset,
  //         additionalAssets: [{
  //           imgAlt: "",
  //           imgTitle: "",
  //           imgPath: "",
  //         }],
  //       }
  //     }));
  //   }
  // }

  // useEffect(() => {
  //   checkNullAdditionalAssets();
  // });

  useEffect(() => {
    console.log({ imageAssets });
  }, [imageAssets]);

  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <Typography
            variant="h6"
            className="text-md font-medium text-gray-800"
          >
            Listing Banner
          </Typography>
        </Grid2>
        <GenericImgModal
          category={"listingBanner"}
          imageData={imageAssets?.listingBanner}
          setImageData={setImageAssets}
        />
        <Divider />
      </Grid2>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <Typography
            variant="h6"
            className="text-md font-medium text-gray-800"
          >
            Square Banner
          </Typography>
        </Grid2>
        <GenericImgModal
          category={"squareBanner"}
          imageData={imageAssets?.squareBanner}
          setImageData={setImageAssets}
        />
      </Grid2>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <Typography
            variant="h6"
            className="text-md font-medium text-gray-800"
          >
            Event Banner Component
          </Typography>
        </Grid2>
        <GenericImgModal
          category={"eventBannerComponent"}
          imageData={imageAssets?.eventBannerComponent}
          setImageData={setImageAssets}
        />
      </Grid2>
      {/* <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <Typography
            variant="h6"
            className="text-md font-medium text-gray-800"
          >
            Additional Assets
          </Typography>
        </Grid2>
        {imageAssets?.additionalAsset?.map((asset, index) => (
          <GenericImgModal
            category={"additionalAssets"}
            key={index}
            imageData={asset}
            setImageData={setImageAssets}
          />
        ))}
      </Grid2> */}
    </>
  );
}

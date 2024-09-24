import { Delete } from "@mui/icons-material";
import { Button, Grid2, TextField } from "@mui/material";
import React from "react";

export default function StructuredEventData({
  type,
  eventInfo,
  index,
  setEventData,
  disabled,
}) {
  return (
    <Grid2 className="flex gap-2 flex-row" size={12} key={index}>
      <TextField
        className="w-full"
        multiline
        id={`${index}-dialog`}
        label={`${type?.label} ${index + 1}`}
        value={eventInfo}
        disabled={disabled}
        onChange={(e) => {
          const newValue = e?.target?.value;
          setEventData((prev) => ({
            ...prev,
            [type?.id]: prev?.[type?.id]?.map((item, i) =>
              i === index ? newValue : item
            ),
          }));
        }}
      />
      <Button
        className="flex justify-items-center"
        startIcon={<Delete />}
        disabled={disabled}
        onClick={() =>
          setEventData((prev) => ({
            ...prev,
            [type?.id]: prev?.[type?.id]?.filter((_, i) => i !== index),
          }))
        }
      />
    </Grid2>
  );
}

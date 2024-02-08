// component for the dynamic field settings
import { Card, CardContent, MenuItem, Select } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useEffect, useRef, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
// import useGetOrganizationalInterestDynamicFields from "./hooks/useGetOrganizationalInterestDynamicFields.ts";
// import { useParams } from "react-router";
// import useSetOrganizationalInterestDynamicFieldsCommand from "./hooks/useSetOrganizationalInterestDynamicFieldsCommand.ts";
// import { enqueueSnackbar } from "notistack";
// import { InterestDynamicFieldSkeleton } from "./components/InterestDynamicFieldSkeleton.tsx";
import { IDynamicFields } from "./interfaces.ts";
import { CarbonDraggable } from "./draggable-icon.tsx";

export const InterestDynamicFieldSettings = () => {
  const [fields, setFields] = useState<IDynamicFields[]>([]);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  // const { organizationId } = useParams<{ organizationId: string }>();

  // const {
  //   data: dynamicFieldsData,
  //   isLoading,
  //   refetch,
  // } = useGetOrganizationalInterestDynamicFields({
  //   organizationId: organizationId ?? "",
  // });

  // const [setOrganizationInterestDynamicFields, commandResponse] =
  //   useSetOrganizationalInterestDynamicFieldsCommand();

  // useEffect(() => {
  //   if (dynamicFieldsData) {
  //     setFields(dynamicFieldsData?.Result?.DynamicFields ?? []);
  //   }
  // }, [dynamicFieldsData]);

  // useEffect(() => {
  //   if (dynamicFieldsData) {
  //     setIsDirty(
  //       JSON.stringify(fields) !==
  //         JSON.stringify(dynamicFieldsData?.Result?.DynamicFields)
  //     );
  //   }
  // }, [fields, dynamicFieldsData]);

  // useEffect(() => {
  //   if (!commandResponse.data) {
  //     return;
  //   }
  //   if (commandResponse.data?.ExternalError) {
  //     enqueueSnackbar(commandResponse.data?.ExternalError, {
  //       variant: "error",
  //     });
  //     commandResponse.remove();
  //     return;
  //   }
  //   enqueueSnackbar("Interest dynamic fields updated successfully");
  //   // commandResponse.remove();
  //   // refetch();
  // }, [commandResponse.data]);

  const handleAddField = () => {
    setFields((prevFields) => [
      ...prevFields,
      { Name: `Field ${prevFields.length + 1}`, Type: "text", Value: "" },
    ]);
  };
  const handleRemoveField = (index: number) => () => {
    setFields((prevFields) => {
      const newFields = [...prevFields];
      newFields.splice(index, 1);
      return newFields;
    });
  };

  const handleSave = () => {
    const hasEmptyFieldName = fields.some((field) => field.Name === "");
    if (hasEmptyFieldName) {
      // enqueueSnackbar("Field name cannot be empty", {
      //   variant: "error",
      // });
      return;
    }
    // setOrganizationInterestDynamicFields(organizationId ?? "", fields);
    console.log("fields", fields);
  };

  //Drag and drop functionality starts from here
  const dragItem = useRef<HTMLDivElement | null>(null);
  const dragOverItem = useRef<HTMLDivElement | null>(null);

  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("Dragging start !!");
    dragItem.current = e.currentTarget;
    console.log("Drag item", dragItem.current.id);
  };
  const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("Dragging has entered another div");
    dragOverItem.current = e.currentTarget;
    console.log("Drag over item", dragOverItem.current.id);
  };
  const drop = () => {
    const copyFieldItems = [...fields];
    // const dragItemContent = copyFieldItems.find(
    //   (item) => item.Name === dragItem?.current?.id
    // );
    // const dragOverItemContent = copyFieldItems.find(
    //   (item) => item.Name === dragOverItem?.current?.id
    // );

    const dragItemContent = dragItem.current?.id
      ? copyFieldItems[Number(dragItem.current?.id)]
      : undefined;

    const dragOverItemContent = dragOverItem.current?.id
      ? copyFieldItems[Number(dragOverItem.current?.id)]
      : undefined;

    if (dragItemContent && dragOverItemContent) {
      // const indexDragItem = copyFieldItems.indexOf(dragItemContent);
      // const indexDragOverItem = copyFieldItems.indexOf(dragOverItemContent);

      // [copyFieldItems[indexDragItem], copyFieldItems[indexDragOverItem]] = [
      //   copyFieldItems[indexDragOverItem],
      //   copyFieldItems[indexDragItem],
      // ];

      [
        copyFieldItems[Number(dragItem.current?.id)],
        copyFieldItems[Number(dragOverItem.current?.id)],
      ] = [
        copyFieldItems[Number(dragOverItem.current?.id)],
        copyFieldItems[Number(dragItem.current?.id)],
      ];

      setFields(copyFieldItems);
      setIsDirty(true);
      console.log("dropped!");
    }
  };

  return (
    <Card sx={{ my: 1, mx: 2, boxShadow: "" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Configure Interest Dynamic Field
        </Typography>
        {fields.length === 0 && (
          <Typography sx={{ mt: 2 }} variant="body2" gutterBottom>
            No interest dynamic field is configured for this organization.
          </Typography>
        )}

        {/* {isLoading && <InterestDynamicFieldSkeleton />} */}

        {fields.map((field, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={2}
            sx={{ mt: 4 }}
            id={`${index}`}
            draggable
            onDragStart={(e) => dragStart(e)}
            onDragEnter={(e) => dragEnter(e)}
            onDragEnd={drop}>
            <TextField
              label={"Field Name"}
              fullWidth
              value={field.Name}
              onChange={(e) => {
                const value = e.target.value;
                setFields((prevFields) => {
                  const newFields = [...prevFields];
                  newFields[index] = { ...newFields[index], Name: value };
                  return newFields;
                });
              }}
            />
            <FormControl fullWidth>
              <InputLabel id="field-type"> Type</InputLabel>
              <Select
                id="field-type"
                label="Field"
                value={field.Type}
                onChange={(e) => {
                  const value = e.target.value;
                  setFields((prevFields) => {
                    const newFields = [...prevFields];
                    newFields[index] = { ...newFields[index], Type: value };
                    return newFields;
                  });
                }}>
                <MenuItem value={"text"}>Text</MenuItem>
                <MenuItem value={"number"}>Number</MenuItem>
                <MenuItem value={"date"}>Date</MenuItem>
              </Select>
            </FormControl>
            <Button
              // variant="soft"
              color="error"
              sx={{
                px: 4,
                borderRadius: 1,
              }}
              onClick={handleRemoveField(index)}>
              Remove
            </Button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "grab",
              }}>
              <CarbonDraggable />
            </div>
          </Stack>
        ))}

        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleAddField}>
          Add Field
        </Button>

        <Stack direction="row" spacing={2} sx={{ mt: 2 }} alignItems="center">
          <LoadingButton
            variant={"contained"}
            color={"primary"}
            sx={{ mt: 2, px: 4 }}
            size={"medium"}
            // loading={commandResponse.isFetching}
            onClick={handleSave}
            disabled={!isDirty}>
            Save
          </LoadingButton>

          <Typography variant="body2" sx={{ mt: 2 }} fontStyle={"italic"}>
            {isDirty ? "Unsaved changes" : ""}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

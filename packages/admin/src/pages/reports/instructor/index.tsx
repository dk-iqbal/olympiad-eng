// import React from "react";
// import { Grid, useTheme, Paper, Box, List } from "@mui/material";
// import BaseLayout from "src/layouts/components/common/BaseLayout";
// import CustomAutocomplete from "src/layouts/components/common/Autocomplete";
// import InputField from "src/layouts/components/common/InputField";
// import ListItemComponent from "src/layouts/components/common/ListItem";
// import Button from "src/layouts/components/common/Button";

// const initialData = [
//   {
//     id: '1',
//     course: "Accounting Model Test",
//     name: "MR. Rakibul Hasan",
//     shortDescription: "",
//     price: "5421",
//     discount: "250",
//     paymentMethod: "Bkash",
//     catetory: "Basic",
//     status: true,
//     instructor: "Shafiqul Islam",
//     info: {
//       section: 5,
//       lesson: 16,
//       enrolled: 12,
//       expiryPeriod: "Lifetime",
//       paymentMethod: "Bkash",
//       purchaseDate: "2022-01-01",
//     },
//   },
//   {
//     id: '2',
//     course: "Math Model Test",
//     name: "Dr. Harun Chy",
//     shortDescription: "",
//     price: "1423",
//     discount: "250",
//     paymentMethod: "Cash",
//     catetory: "Academic",
//     status: true,
//     instructor: "Saddam Hossain",
//     info: {
//       section: 8,
//       lesson: 19,
//       enrolled: 2,
//       expiryPeriod: "Lifetime",
//       paymentMethod: "Cash",
//       purchaseDate: "2022-01-10",
//     },
//   },
// ];

// const InstructorReport = () => {
//   const theme = useTheme();

//   return (
//     <BaseLayout heading="INSTRUCTOR REPORT">
//       <Paper sx={{ mt: { xs: 1, sm: 2 } }}>
//         <Grid
//           container
//           spacing={1}
//           p={1}
//           justifyContent={"center"}
//           alignItems={"center"}
//         >
//           {/* Course Status */}
//           <Grid item xs={12} md={3}>
//             <CustomAutocomplete
//               onChange={(e) => {
//                 console.log(e)
//               }}
//               options={[{ label: "Mr. Karim", value: "Mr. Karim" }]}
//               placeholder="Select Course/Model Test"
//             />
//           </Grid>

//           {/* Course Instructors */}
//           <Grid item xs={12} md={3}>
//             <CustomAutocomplete
//               onChange={(e) => {
//                 console.log(e)
//               }}
//               options={[{ label: "Mr. Karim", value: "Mr. Karim" }]}
//             />
//           </Grid>

//           {/* Course Price */}
//           <Grid item xs={12} md={3} mt={-0.5}>
//             <InputField
//               name={"search"}
//               value={""}
//               type={"text"}
//               onChange={() => {
//                 console.log('Data')
//               }}
//               placeholder={"Search By Name or Mobile"}
//             />
//           </Grid>

//           <Grid item xs={12} md={3}>
//             <Button
//               name="Filter"
//               type="submit"
//               bgColor={theme.palette.primary.dark}
//               color={theme.palette.common.white}
//             />
//           </Grid>
//         </Grid>

//         {initialData?.length > 0 ? (
//           <Box
//             sx={{
//               maxHeight: `auto`,
//               overflowX: "hidden",
//               overflowY: "auto",
//               padding: "5px",
//             }}
//           >
//             <List
//               sx={{
//                 bgcolor: "inherit",
//                 mb: 1,
//                 mt: { xs: 1, md: 1 },
//                 "& ul": { padding: 0 },
//               }}
//             >
//               {initialData?.map((course, index) => {
//                 const modifyObject = {
//                   id: course.id,
//                   name: course.name,
//                   course: course.course,
//                   status: course.status ? "Active" : "Deactive",
//                   section: course.info.section,
//                   lesson: course.info.lesson,

//                   // enrolled: course.info.enrolled,
//                   details: [
//                     { label: "Instructor", value: course.instructor },
//                     { label: "Category", value: course.catetory },
//                     { label: "Price", value: course.price },
//                     {
//                       label: "Payment Method",
//                       value: course.info.paymentMethod,
//                     },
//                     {
//                       label: "Purchased date",
//                       value: course.info.purchaseDate,
//                     },
//                     {
//                       label: "Percentage",
//                       value: (Number(course.price) * 5) / 100,
//                     },
//                   ],
//                 };

//                 return (
//                 <ListItemComponent key={index} item={modifyObject} />
//                 )
//               })}
//             </List>
//           </Box>
//         ) : (
//           <></>
//         )}
//       </Paper>
//     </BaseLayout>
//   );
// };

// export default InstructorReport;

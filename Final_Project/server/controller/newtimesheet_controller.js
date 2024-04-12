const Timesheet = require('../models/timesheetModel'); // Import the Timesheet model


const storedata = async (req, res) => {
    try {
        // Generate UUID
        const uuid = generateUUID();
      //  console.log(req.body.data)

        const { responseEmail } = req.params; // Assuming you're passing responseEmail as a parameter

        // Iterate over each object in req.body.data
        for (const dataObj of req.body.data) {
            const { rowId, projectType, projectName, task, comment, days, startDate, endDate } = dataObj; // Destructure each object
            const { mon, tue, wed, thur, fri, sat, sun } = calculateHours(days);
            // Add 1 day to startDate and endDate
            const newStartDate = new Date(startDate);
            newStartDate.setDate(newStartDate.getDate() + 1);

            const newEndDate = new Date(endDate);
            newEndDate.setDate(newEndDate.getDate() + 1);

            // Format the dates as "Mar 18, 2024"
            const startDateString = getFormattedDate(newStartDate);
            const endDateString = getFormattedDate(newEndDate);

            const timesheet = new Timesheet({
                UID: generateUUID(),
                email: responseEmail,
                rowid: rowId,
                projectType:projectType,
                projectName: projectName,
                task: task,
                comment:comment,
                mon,
                tue,
                wed,
                thur,
                fri,
                sat,
                sun,
                total: calculateTotalHours(days),
                startDate: startDateString,
                endDate: endDateString
            });

            // Function to format the date
            function getFormattedDate(date) {
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ];
                const day = date.getDate();
                const monthIndex = date.getMonth();
                const year = date.getFullYear();
                return `${monthNames[monthIndex]} ${day}, ${year}`;
            }


            // Save the timesheet to the database
            await timesheet.save();
        }

        // Respond with success message
        res.status(201).json({ success: true, message: 'Timesheets created successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error creating timesheets:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Helper function to calculate hours for each day
const calculateHours = (days) => {
    // Assuming days is an array containing hours for each day
    const [mon = 0, tue = 0, wed = 0, thur = 0, fri = 0, sat = 0, sun = 0] = days;
    return { mon, tue, wed, thur, fri, sat, sun };
};

const calculateTotalHours = (days) => {
    // Sum up the values in the days array to calculate the total hours
    const total = days.reduce((acc, day) => acc + day, 0);
    return total;
};

// Function to generate UUID
const generateUUID = () => {
    // Implementation of UUID generation (you can use any UUID generation library)
    // Here's a simple implementation using Math.random():
    const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
};


//to retrive the timesheet details
// Controller function to fetch timesheet data

const getTimesheetDetails = async (req, res) => {
    try {
        const { email, startDate, endDate } = req.params;
        // console.log("received data", email, startDate, endDate);
        // Fetch timesheet data from the database based on email and date range
        const timesheetData = await Timesheet.find({
            email:email,
            startDate:startDate,
            endDate:endDate
        });
        // console.log("received data", email, startDate, endDate)
        // console.log("Data from timesheet", timesheetData)
        res.json({ rows: timesheetData });
    } catch (error) {
        console.error('Error fetching timesheet data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { storedata, getTimesheetDetails };

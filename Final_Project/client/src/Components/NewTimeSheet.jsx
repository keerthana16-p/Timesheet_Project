import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import '../Styles/NewTimeSheet.css';

function Timesheet() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [rows, setRows] = useState([{ id: 1 }]);
    const [rowCount, setRowCount] = useState(1);// To keep track of the number of rows
    const [projects, setProjects] = useState([]);


    useEffect(() => {
        // Update the current date only once during initial render
        const initialDate = new Date();
        setCurrentDate(initialDate);
    }, []);

    useEffect(() => {
        const dateChangeDiv = document.querySelector('.dateChange');

        const fetchData = async () => {
            try {
                const [startDateStr, endDateStr] = dateChangeDiv.textContent.split(' - ');
                const startNextDay = new Date(startDateStr);
                startNextDay.setDate(startNextDay.getDate() + 1);
                const startFormattedDate = startNextDay.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

                const endNextDay = new Date(endDateStr);
                endNextDay.setDate(endNextDay.getDate() + 1);
                const endFormattedDate = endNextDay.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });


                const response = await axios.get(`http://localhost:5000/api/timesheet/details/${sessionStorage.responseEmail}/${startFormattedDate}/${endFormattedDate}`);

                // Assuming response.data contains rows data for timesheet
                console.log('Response from server:', response.data.rows[0]);
                //setRows(response.data);
                console.log('Timesheet data Entries:', response.data);
            } catch (error) {
                setRows([{ id: 1 }]);
                console.error('Error fetching timesheet data:', error);
            }
        };

        fetchData();
    }, [currentDate]);

    const addRow = () => {
        const newRowId = rowCount + 1;
        setRows([...rows, { id: newRowId }]);
        setRowCount(newRowId);
    };

    const deleteRow = (id) => {
        if (rows.length === 1) {
            // Ensure at least one row is present
            return;
        }
        setRows(rows.filter(row => row.id !== id));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log('name : ', name);
        console.log('value : ', value);
        const newValue = parseInt(value.replace(/\D/g, ''), 10) || 0; // Parse value as integer, default to 0 if empty or NaN

        // Update the state of the input value
        const rowIndex = parseInt(name.split('_')[0], 10);
        const columnIndex = parseInt(name.split('_')[1], 10);
        const updatedRows = [...rows];
        updatedRows[rowIndex][`column_${columnIndex}`] = newValue;
        setRows(updatedRows);
    };

    const formattedDate = (date) => {
        const startOfWeek = new Date(date);
        const endOfWeek = new Date(date);

        const startDay = startOfWeek.getDay();
        const diff = startOfWeek.getDate() - startDay + (startDay === 0 ? 1 : -6);

        startOfWeek.setDate(diff);
        endOfWeek.setDate(diff + 6);

        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return `${startOfWeek.toLocaleDateString('en-US', options)} - ${endOfWeek.toLocaleDateString('en-US', options)}`;
    };

    const handleSubmit = async () => {
        try {
            const dataToSend = rows.map(row => {
                const startOfWeek = new Date(currentDate);
                const endOfWeek = new Date(currentDate);

                const startDay = startOfWeek.getDay();
                const diff = startOfWeek.getDate() - startDay + (startDay === 0 ? 1 : -6);

                startOfWeek.setDate(diff);
                endOfWeek.setDate(diff + 6);

                const options = { day: '2-digit', month: 'short', year: 'numeric' };

                const startFormattedDate = startOfWeek.toLocaleDateString('en-US', options);
                const endFormattedDate = endOfWeek.toLocaleDateString('en-US', options);

                return {
                    rowId: row.id,
                    projectType: row.projectType,
                    projectName: row.projectName,
                    task: row.task,
                    comment: row.comment,
                    days: [
                        row.column_0,
                        row.column_1,
                        row.column_2,
                        row.column_3,
                        row.column_4,
                        row.column_5,
                        row.column_6
                    ],
                    startDate: startFormattedDate,
                    endDate: endFormattedDate,
                };
            });

            console.log('data sent', dataToSend);
            const response = await axios.post(`http://localhost:5000/api/timesheet/storedata/${sessionStorage.responseEmail}`, { data: dataToSend });
            console.log(response.data);
            window.location.href = '/feedbackform';
        } catch (error) {
            console.error('Error storing data:', error);
            // Handle error
        }
    };



    const calculateTotals = () => {
        const totals = Array.from({ length: 8 }, () => 0); // Initialize totals array with zeros for each day plus one for the Total column

        // Calculate totals horizontally (across days)
        rows.forEach(row => {
            row.total = 0;
            for (let i = 0; i < 7; i++) {
                if (row[`column_${i}`]) {
                    totals[i] += row[`column_${i}`];
                    row.total += row[`column_${i}`]; // Update row total
                    totals[7] += row[`column_${i}`]; // Update Total column
                }
            }
        });

        // Check for conditions and apply styling
        const totalHoursExceeds = totals[7] > 40;
        const horizontalExceeds = totals.slice(0, 7).some(dayTotal => dayTotal > 8);

        return { totals, totalHoursExceeds, horizontalExceeds };
    };

    const { totals, totalHoursExceeds, horizontalExceeds } = calculateTotals();
    const generateTableHeader = () => {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const tableHeader = days.map((day, index) => {
            const dayDate = new Date(currentDate);
            const startDay = dayDate.getDay(); // Get the day of the week (0 - Sunday, 1 - Monday, ...)
            const diff = dayDate.getDate() - startDay + (startDay === 0 ? 1 : -6); // Adjust if the current day is Sunday
            dayDate.setDate(diff + index);
            return (
                <th key={index}>
                    <div>{day}</div>
                    <div>{dayDate.getDate()}</div>
                </th>
            );
        });
        return tableHeader;
    };

    const handleNextWeek = () => {
        const nextWeek = new Date(currentDate);
        nextWeek.setDate(nextWeek.getDate() + 7); // Move to the next week
        setCurrentDate(nextWeek);
        // Reset rows to initial state
        setRows([{ id: 1 }]);
        setRowCount(1);
        // Clear project-related fields
        clearProjectFields();
    };

    const clearProjectFields = () => {
        const updatedRows = rows.map(row => ({
            ...row,
            projectType: '',
            projectName: '',
            task: '',
            comment: '',
            column_0: 0,
            column_1: 0,
            column_2: 0,
            column_3: 0,
            column_4: 0,
            column_5: 0,
            column_6: 0,
            total: 0
        }));
        console.log('updatedRows', updatedRows)
        setRows(updatedRows);
        console.log('Rows', rows)
    };


    const handlePreviousWeek = async () => {
        const previousWeek = new Date(currentDate);
        previousWeek.setDate(previousWeek.getDate() - 7); // Move to the previous week
        setCurrentDate(previousWeek);
    };

    const handleProjectTypeChange = (event, rowIndex) => {
        const { value } = event.target;
        // Create a copy of the rows state
        const updatedRows = [...rows];
        // Update the project type property in the corresponding row
        updatedRows[rowIndex].projectType = value;
        // Set the updated rows state
        setRows(updatedRows);
    };
    const handleProjectNameChange = (event, rowIndex) => {
        const { value } = event.target;
        const updatedRows = [...rows];
        // Update the project type property in the corresponding row
        updatedRows[rowIndex].projectName = value;
        setRows(updatedRows);
    };
    const handleTaskChange = (event, rowIndex) => {
        const { value } = event.target;
        const updatedRows = [...rows];
        // Update the task property in the corresponding row
        updatedRows[rowIndex].task = value;
        setRows(updatedRows);
    };

    const handleCommentChange = (event, rowIndex) => {
        const { value } = event.target;
        const updatedRows = [...rows];
        // Update the comment property in the corresponding row
        updatedRows[rowIndex].comment = value;
        setRows(updatedRows);
    };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Make an HTTP request to fetch projects based on user's email
                const response = await axios.get(`http://localhost:5000/api/resources/getResources/${sessionStorage.responseEmail}`);
                const projects = response.data; 
                console.log('projects', projects);

                // Extracting projectId from each object in the projects array
                const projectNames = projects.map(project => project.projectName);
                console.log('projectIds', projectNames);
                // Update state with fetched projectIds
                setProjects(projectNames);

            } catch (error) {
                console.error('Error fetching projects:', error);
                // Handle error
            }
        };
        // Call the fetchProjects function
        fetchProjects();
    }, []);
    console.log(rows)

    return (
        <div>
            <div >
                <div><strong><h2 style={{ marginTop: '20px', fontWeight: 'bold', color: '#19105B' }}>Timesheet</h2></strong></div>
                <div className="dateChange" style={{ fontSize: '14px', textAlign: 'right', paddingRight: '20px' }}>
                    <i className="fa-solid fa-chevron-left" onClick={handlePreviousWeek}></i>{formattedDate(currentDate)}
                    <i className="fa-solid fa-chevron-right" onClick={handleNextWeek}></i>
                </div>
            </div>
            <div>
                <div className='allow tm'>Timesheet</div>
                <div>
                    <table className='tbl'>
                        <thead>
                            <tr>
                                <th style={{ width: '120px' }}>Project Type</th>
                                <th style={{ width: '90px' }}>Project Name</th>
                                <th style={{ width: '90px' }}>Task</th>
                                <th style={{ width: '150px' }}>Comment</th>
                                {generateTableHeader()}
                                <th><div>Total</div></th>
                                <th style={{ width: '75px' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr className='tda' key={row.id}>
                                    <td style={{ width: '120px' }}>
                                        <select value={row.projectType} onChange={(event) => handleProjectTypeChange(event, index)}>
                                            <option value="">Select Project Type</option>
                                            <option value="bau">BAU Activity</option>
                                            <option value="sales">Sales Activity</option>
                                            <option value="sales">Client Project</option>
                                        </select>
                                    </td>
                                    <td style={{ width: '90px' }}>
                                        <select value={row.projectName} onChange={(event) => handleProjectNameChange(event, index)}>
                                            <option value="">Select Project Name</option>
                                            {projects.map((project, index) => (
                                                <option key={index} value={project}>
                                                    {project}
                                                </option>
                                            ))}
                                        </select>
                                    </td>

                                    <td style={{ width: '90px' }}>
                                        <select value={row.task} onChange={(event) => handleTaskChange(event, index)}>
                                            <option value="">Select Task</option>
                                            <option value="Requirement Analysis">Requirement Analysis</option>
                                            <option value="Design">Design</option>
                                            <option value="Development">Development</option>
                                            <option value="Testing">Testing</option>
                                            <option value="Bug Fixing">Bug Fixing</option>
                                            <option value="Code Review">Code Review</option>
                                            <option value="Deployment">Deployment</option>
                                            <option value="Documentation">Documentation</option>
                                            <option value="Meetings">Meetings</option>
                                            <option value="Research and Development">Research and Development</option>
                                            <option value="Integration">Integration</option>
                                        </select>
                                    </td>

                                    <td style={{ width: '150px' }}><input value={row.comment} type='text' onChange={(event) => handleCommentChange(event, index)}></input></td>
                                    {[...Array(7)].map((_, columnIndex) => (
                                        <td key={columnIndex}>
                                            <div>
                                                <input
                                                    type='number'
                                                    name={`${index}_${columnIndex}`}
                                                    onChange={handleInputChange}
                                                    value={row[`column_${columnIndex}`] || ''}
                                                />
                                            </div>
                                        </td>
                                    ))}
                                    <td>
                                        <input
                                            type='text'
                                            style={{ border: 'none' }}
                                            value={row.total}
                                            readOnly
                                        />
                                    </td>

                                    <td style={{ width: '75px' }}>
                                        {index === 0 ?
                                            <i className='bx bx-plus' onClick={addRow}></i> :
                                            <i className='bx bx-minus' onClick={() => deleteRow(row.id)}></i>}
                                    </td>
                                </tr>
                            ))}
                            <tr className='tda'>
                                <td style={{ width: '120px' }}>Total Hours</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                {[...Array(7)].map((_, index) => (
                                    <td key={index}><input type='text' style={{ border: 'none' }} value={totals[index]} readOnly /></td>
                                ))}
                                <td></td>
                                <td style={{ width: '75px' }}></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <div className='btd'>
                    <button type="button" className="btn btns ">Save</button>
                    <button type="button" className="btn btns1" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default Timesheet;

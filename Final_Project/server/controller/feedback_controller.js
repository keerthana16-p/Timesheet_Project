const InternFeedback = require('../models/intern_feedback_model');
const generalFeedback = require('../models/general_feedback_model');
const consultantFeedback = require('../models/consultant_feedback_model');
const tribemasterFeedback = require('../models/tribemaster_feedback_model');

const feedbackController = {};

feedbackController.interncreateFeedback = async (req, res) => {
    try {
        
        const { userName,guidance, tasks, communication, support, contribution, feedbackProcess, application, learningExperience, improvements } = req.body;
        
        // Create a new feedback instance
        const feedback = new InternFeedback({
          userName,
          guidance,
          tasks,
          communication,
          support,
          contribution,
          feedbackProcess,
          application,
          learningExperience,
          improvements
        });
    
        // Save the feedback to the database
        await feedback.save();
    
        // Respond with success message
        res.status(201).json({ success: true, message: 'Feedback added successfully' });
      } catch (error) {
        // If an error occurs, log it and respond with an error message
        console.error('Error adding feedback:', error);
        res.status(500).json({ success: false, message: 'Error adding feedback' });
      }
};


// Controller function to add senior developer feedback
feedbackController.generalcreateFeedback = async (req, res) => {
  try {
    const {
      userName,
      satisfaction,
      communication,
      goals,
      deliverables,
      timeliness,
      challenges,
      projectManagement,
      support,
      improvements
    } = req.body;

    const feedback = new generalFeedback({
      userName,
      satisfaction,
      communication,
      goals,
      deliverables,
      timeliness,
      challenges,
      projectManagement,
      support,
      improvements
    });

    await feedback.save();

    res.status(201).json({ success: true, message: 'Feedback added successfully' });
  } catch (error) {
    console.error('Error adding feedback:', error);
    res.status(500).json({ success: false, message: 'Error adding feedback' });
  }
};

// Controller function to add consultant feedback
feedbackController.consultantcreateFeedback = async (req, res) => {
  try {
    // Extract feedback data from request body
    const {userName, projectQuality, communication, problemSolving, responsiveness, professionalism, collaboration, overallSatisfaction, suggestions } = req.body;

    // Create a new instance of ConsultantFeedback model
    const feedback = new consultantFeedback({
      userName,
      projectQuality,
      communication,
      problemSolving,
      responsiveness,
      professionalism,
      collaboration,
      overallSatisfaction,
      suggestions
    });

    // Save feedback to the database
    await feedback.save();

    // Respond with success message
    res.status(201).json({ success: true, message: 'Consultant feedback submitted successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error submitting consultant feedback:', error);
    res.status(500).json({ success: false, message: 'Error submitting consultant feedback' });
  }
};

//// Controller function to add tribemaster feedback
feedbackController.tribemastercreateFeedback = async (req, res) => {
    try {
      const { userName,leadership, communication, decisionMaking, teamManagement, problemSolving, collaboration, overallPerformance } = req.body;
      const feedback = new tribemasterFeedback({ userName,leadership, communication, decisionMaking, teamManagement, problemSolving, collaboration, overallPerformance });
      await feedback.save();
      res.status(201).json({ success: true, message: 'Feedback added successfully' });
    } catch (error) {
      console.error('Error adding feedback:', error);
      res.status(500).json({ success: false, message: 'Error adding feedback' });
    }
  };


  //Controller to send data about feedback to front end
  feedbackController.getdetails = async (req, res) => {
    try {
      const role = req.params.role;
      const userName = req.params.username;
      console.log("Role : ", role);
      console.log("Username : ", userName);
  
      let feedbackDetails;
  
      // Choose the appropriate model based on the role
      switch (role.toLowerCase()) {
        case 'intern':
        case 'Intern':
          console.log('Inside Intern');
          feedbackDetails = await InternFeedback.find({ userName });
          break;
        case 'senior developer':
        case 'Senior Developer':
          console.log('Inside General');
          feedbackDetails = await generalFeedback.find({ userName });
          break;
        case 'consultant':
        case 'Consultant':
          console.log('Inside Consultant');
          feedbackDetails = await consultantFeedback.find({ userName });
          break;
        case 'tribemaster':
        case 'Tribemaster':
          console.log('Inside Tribemaster');
          feedbackDetails = await tribemasterFeedback.find({ userName });
          break;
        default:
          return res.status(400).json({ success: false, message: 'Invalid role' });
      }
  
      if (!feedbackDetails) {
        return res.status(404).json({ success: false, message: 'Feedback details not found' });
      }
  
      console.log("FeedbackDetails", feedbackDetails);
      res.status(200).json({ success: true, data: feedbackDetails });
    } catch (error) {
      console.error('Error fetching feedback details:', error);
      res.status(500).json({ success: false, message: 'Error fetching feedback details' });
    }
  };
  

module.exports = feedbackController;

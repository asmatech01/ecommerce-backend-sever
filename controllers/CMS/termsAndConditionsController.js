const TermsAndConditions = require('../../models/CMS/termsAndConditionsSchema');

// Create new terms and conditions
exports.createTermsAndConditions = async (req, res) => {
    try {
      const { content } = req.body;
    //   console.log    (req.body)
      const newTermsAndConditions = new TermsAndConditions({ content });
      const savedTermsAndConditions = await newTermsAndConditions.save();
      res.json(savedTermsAndConditions);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
      console.log({ error: 'Internal server error' });
    }
  };
  
// Get the terms and conditions
exports.getTermsAndConditions = async (req, res) => {
  try {
    const termsAndConditions = await TermsAndConditions.findOne().sort({ updatedAt: -1 });
    res.json(termsAndConditions);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update the terms and conditions
exports.updateTermsAndConditions = async (req, res) => {
  try {
    const { content } = req.body;
    console.log(req.boy)
    const updatedTermsAndConditions = await TermsAndConditions.findOneAndUpdate(
      {},
      { content, updatedBy: "req.user._id" },
      { new: true, upsert: true }
    );
    res.json(updatedTermsAndConditions);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

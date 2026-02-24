const { callAI } = require('./ai.service');

exports.executeWorkflow = async (workflow, inputData) => {
  const result = await callAI({ prompt: `Handle workflow ${workflow.workflow_type} with input: ${JSON.stringify(inputData)}` });
  return { success: true, output: result };
};

exports.checkTrialExpiration = async (sub) => sub?.status === 'trial' && new Date(sub.trial_end) < new Date();
exports.checkTrialExpirations = async () => true;

const { callAI } = require('./ai.service');
const { sendEmail, sendWhatsApp } = require('./notification.service');
const supabase = require('../config/supabase');

exports.executeWorkflow = async (workflow, inputData) => {
  if (workflow.workflow_type === 'whatsapp-bot') {
    const ai = await callAI({ prompt: `Reply professionally: ${inputData.message}` });
    await sendWhatsApp(inputData.phone, ai.text);
    return { success: true, output: { reply: ai.text } };
  }

  if (workflow.workflow_type === 'automation-pack') {
    await sendEmail({ to: inputData.lead_email, subject: 'Lead received', body: 'We will contact you soon.' });
    return { success: true, output: { leadCaptured: true } };
  }

  return { success: true, output: { message: 'Workflow executed' } };
};

exports.checkTrialExpiration = async (userProduct) => {
  if (!userProduct || userProduct.status !== 'trial') return false;
  if (new Date(userProduct.trial_end) > new Date()) return false;
  await supabase.from('user_products').update({ status: 'expired' }).eq('id', userProduct.id);
  return true;
};

exports.checkTrialExpirations = async () => {
  await supabase.from('user_products').update({ status: 'expired' }).eq('status', 'trial').lt('trial_end', new Date().toISOString());
};

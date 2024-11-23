const express = require('express');
const multer = require('multer');
const { AssemblyAI } = require('assemblyai');
const fs = require('fs');
const cors = require('cors');
const app = express();
const upload = multer({ dest: 'uploads/' });
const path = require('path');

const generateCodeSnippet = (parameters, apiKey, isURL) => {

    if (!isURL) parameters.audio = "replace_with_your_actual_audio_system_path";

    const codeSnippet = `
// Make sure you installed the assemblyai package
const { AssemblyAI } = require('assemblyai');

// Initialize the AssemblyAI client with the provided API key
const client = new AssemblyAI({
  apiKey: '${apiKey}'
});

// Parameters for the transcription request
const params = ${JSON.stringify(parameters, null, 2)};

// Function to run the transcription
const run = async () => {
  try {
    // Send the transcription request to AssemblyAI
    const transcript = await client.transcripts.transcribe(params);

    if (transcript.status === 'error') {
      // Throw an error if the transcription failed
      throw new Error(transcript.error);
    } else {
     // Log the transcript text
      console.log('Transcription successful:', transcript.text);
      ${parameters.summarization ? `
      // Log the summary text
      console.log('Summary successful:', transcript.summary);
      ` : ''}
    }
  } catch (error) {
    // Log any errors that occur during the transcription process
    console.error('Error occurred during transcription:', error.message);
  }
};

// Run the transcription function
run();
    `;

    return codeSnippet;
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/upload', upload.single('file'), async (req, res) => {


    const assemblyAiData = JSON.parse(req.body.assemblyai);
    console.log(assemblyAiData);

    const { fileUrl, apiKey, speechSettings, audioIntelligence } = assemblyAiData;
    const client = new AssemblyAI({ "apiKey": apiKey });
    let FILE_URL, isURL = false;
    if (req.file) {
        FILE_URL = req.file.path;
    } else if (fileUrl) {
        FILE_URL = fileUrl;
        isURL = true;
    } else {
        return res.status(400).json({ error: 'File not found' });
    }

    const { speech_model, word_boost, filter_profanity, audio_start_from, audio_end_at } = speechSettings;
    const { summarization, summary_type, summary_model } = audioIntelligence;
    let extra_params = {};
    
    if(summary_model === 'informative'){
        extra_params = {
            punctuate: true,
            format_text: true
        }
    }
    else if(summary_model === 'conversational'){
        extra_params = {
            punctuate: true,
            format_text: true,
            speaker_labels: true,
            // dual_channel: true
        }
    }
    else{
        extra_params = {
            punctuate: true,
            format_text: true
        }
    }

    const parameters = {
        audio : FILE_URL,
        speech_model: speech_model,
        ...(word_boost.length > 0 && { word_boost, boost_param: 'high' }),
        filter_profanity: filter_profanity,
        audio_start_from: audio_start_from,
        audio_end_at: audio_end_at,
        ...(summarization && { summarization, summary_type, summary_model }),
        ...{...extra_params}
    }

    const run = async () => {
        try {
            const transcript = await client.transcripts.transcribe(parameters);

            if(transcript.status === 'error') {
                throw new Error(transcript.error)
            }
            console.log("transcript", transcript);
            const codeSnippet = generateCodeSnippet(parameters, apiKey, isURL);
            res.status(200).json({ "transcript": transcript, "codeSnippet": codeSnippet });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error occurred while transcribing', details: error.message });
        
        } finally {
            fs.unlinkSync(FILE_URL); // Clean up the uploaded file
        }
    };

    run();

});

const generateCodeSnippetSummary = (parameters) => {

    const codeSnippet = `
// Make sure you installed the assemblyai package
const { AssemblyAI } = require('assemblyai');

// Initialize the AssemblyAI client with the provided API key
const client = new AssemblyAI({
  apiKey: '${parameters.apiKey}'
});

const run = async () => {
  try {
    ${parameters.summary_type === 'basic' ? `
    // Step 1: Define a summarization prompt.
    const prompt = "${parameters.prompt}";

    // Step 2: Apply LeMUR.
    const { response } = await client.lemur.task({
        transcript_ids: ["${parameters.transcriptId}"],
        prompt,
        final_model: '${parameters.finalModel}',
        temperature: ${parameters.temperature},
        max_output_size: ${parameters.maxOutputSize}
    });

    console.log(response)
    ` : ''}
    ${parameters.summary_type === 'custom' ? `
    const { response } = await client.lemur.summary({
    transcript_ids: ["${parameters.transcriptId}"],
    final_model: '${parameters.finalModel}',
    prompt: "${parameters.prompt}",
    temperature: ${parameters.temperature},
    context: "${parameters.context}",
    answer_format: '${parameters.answerFormat}',
    max_output_size: ${parameters.maxOutputSize}
    })

    console.log(response)
    ` : ''}
    }
  } catch (error) {
    // Log any errors that occur during the summary generation process
    console.error('Error occurred during summary:', error.message);
  }
};

// Run the transcription function
run();
    `;

    return codeSnippet;
};

app.post('/summary', async (req, res) => {
    
    const leMURdata = req.body.config;
    console.log(leMURdata);

    const { apiKey, finalModel, maxOutputSize, answerFormat, transcriptId, prompt, temperature, context, summary_type } = leMURdata;
    const { happening, location, additional } = context;

    await new Promise(resolve => setTimeout(resolve, 10000));
    leMURdata.context = `happing:${happening} location:${location} additional:${additional}`;
    const client = new AssemblyAI({ "apiKey": apiKey });

    if(summary_type === 'basic'){

        try {
            const { response } = await client.lemur.task({
                transcript_ids: [transcriptId],
                prompt,
                final_model: finalModel,
                max_output_size: maxOutputSize,
                temperature: temperature
            });

            leMURdata.context = `happing:${happening} location:${location} additional:${additional}`;
            const codeSnippet = generateCodeSnippetSummary(leMURdata);
            return res.status(200).json({ "summary": response, "codeSnippet": codeSnippet });

        } catch (error) {
            res.status(500).json({ error: 'Error occurred while generating summary', details: error.message });
        }
    }

    if(summary_type === 'custom'){

        try {
            const { response } = await client.lemur.summary({
                transcript_ids: [transcriptId],
                prompt,
                final_model: finalModel,
                max_output_size: maxOutputSize,
                temperature: temperature,
                context: `happing:${happening} location:${location} additional:${additional}`,
                answer_format: answerFormat
            });

            const codeSnippet = generateCodeSnippetSummary(leMURdata);
            return res.status(200).json({ "summary": response, "codeSnippet": codeSnippet });

        } catch (error) {
            res.status(500).json({ error: 'Error occurred while generating summary', details: error.message });
        }
        
    }

    await new Promise(resolve => setTimeout(resolve, 10000));
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

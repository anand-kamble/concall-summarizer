import pathlib
import os
from textwrap import shorten
from litellm import completion

from apps.ollama.extract_data import extract_text_from_pdf



def summarize_text_with_ollama(text, model, max_length=1024):
    """
    Summarizes text using litellm and an Ollama model.

    Args:
    - text (str): Input text to summarize.
    - model (str): Model name in Ollama.
    - max_length (int): Maximum tokens for the model.

    Returns:
    - str: Summarized text.
    """
    # Shorten text to prevent token limit issues
    text = shorten(text, width=max_length, placeholder="...")


    # Generate summary
    response = completion(
        model=model,
        messages=[
            {
                "role": "system",
                "content": "You are expert in document summarization. Your job is summarize the text given to you."
            },
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Here is the document to summarize:"},
                    {"type": "text", "text": text}
                ]
            }
        ]
    )

    return response['choices'][0]['message']['content']


def summarize_pdf(pdf_path, model):
    """
    Summarizes the content of a PDF file using litellm and Ollama.

    Args:
    - pdf_path (str): Path to the PDF file.
    - model (str): Model name in Ollama.

    Returns:
    - str: Summarized content.
    """
    # Extract text from the PDF
    text = extract_text_from_pdf(pdf_path)

    # Summarize extracted text
    summary = summarize_text_with_ollama(text, model=model)
    return summary


def dummy():
    response = completion(
        model="ollama/llama3.2:latest",
        messages=[{ "content": "respond in 20 words. who are you?","role": "user"}],
    )

    return response['choices'][0]['message']['content']


if __name__ == "__main__":
    # Get the path to the current script
    current_dir = pathlib.Path(__file__).parent
    pdf_file = os.path.join(current_dir,"reliance.pdf")
    summary = summarize_pdf(pdf_file, "ollama/llama3.2:latest")
    print("Summary:", summary)

    # res= dummy()
    # print(res)




import PyPDF2
import pathlib
import os

def extract_text_from_pdf(pdf_path):
    """
    Extracts text from a PDF file.

    Args:
    - pdf_path (str): Path to the PDF file.

    Returns:
    - str: Extracted text.
    """
    text = ""
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            text += page.extract_text()
    return text


if __name__ == "__main__":
    current_dir = pathlib.Path(__file__).parent
    pdf_file = os.path.join(current_dir,"reliance.pdf")
    text = extract_text_from_pdf(pdf_file)
    print(text)

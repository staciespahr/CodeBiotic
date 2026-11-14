# Uses Beautiful Soup to parse HTML, identify sections, and 
# preserve relationships between elements.
from bs4 import BeautifulSoup


def organize_html(html_code: str):

    soup = BeautifulSoup(html_code, "html.parser")

    sections = []

    for element in soup.find_all(
        ["header", "nav", "main", "section", "article", "aside", "footer"]
    ):
        sections.append({
            "tag": element.name,
            "html": str(element)
        })

    return {
        "sections": sections,
        "original_html": html_code
    }
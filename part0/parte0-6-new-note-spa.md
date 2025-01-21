````mermaid

sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa 
    Note right of browser: note: {  content: "spa page note",  date: "2025-01-21T09:01:59.905Z" }, (Content-type: JSON)

    activate server

    deactivate server
    server-->>browser: response: {"message":"note created"}, (Content-type: JSON)
    Note right of browser: HTTP 201 (Created)

   

````

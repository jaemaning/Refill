package com.refill.global.dto.response;

public class MailTemplateResponse {

    public static String template = """
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 40px;
                background-color: #f5f5f5;
            }
            .container {
                max-width: 600px;
                margin: auto;
                background-color: #ffffff;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .content {
                padding: 20px;
                border-top: 1px solid #f0f0f0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="https://via.placeholder.com/150" alt="Company Logo">
            </div>
            <div class="content">
                <h2>{{Subject}}</h2>
                <p>{{Message}}</p>
            </div>
        </div>
    </body>
    </html>
    """;


}

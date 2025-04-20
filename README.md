# Verdit AI-Powered Response Assistant

This Chrome extension helps you craft professional responses to client inquiries across various online conversations using OpenAI GPT. 

Visit [verdit.site/freetool](https://verdit.site/freetool) for more information.

## About Verdit

Verdit is a consulting business specialized in sales automation with AI. Check it out at [verdit.site](https://verdit.site). You can also follow Vitor (founder) on [Twitter](https://twitter.com/vitorpepz).

Some of our consulting services:

- **AI-Powered Lead Scoring**
  Instantly spot who's ready to buy and who's just browsing.

- **Personalized Outreach on Autopilot**
  Custom messages that actually get replies. No spam, just conversions.

- **Real-Time Data Enrichment**
  Enrich your leads with fresh, actionable info from multiple sources, automatically.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Important Note

This extension is primarily intended for technical users who understand API usage and costs. If you're not familiar with managing API keys and technical configurations, this might not be the right tool for you.

## Installation

1. Download the extension files
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory
5. Pin the extension button (A) to your toolbar for easy access
6. Right-click the extension icon and select "Options"
7. Enter your OpenAI API key in the options page
8. You're ready to go!

## Usage

1. Navigate to any conversation (email, chat, etc.)
2. Click the Verdit button (V) when you want to generate a response
3. If successful, you'll see a green "OK!" badge
4. The response will be automatically pasted into the active text field
5. If no text appears but you see the green OK, try pasting manually (Ctrl/Cmd + V)

## Configuration

### API Key
- Required: OpenAI API key
- Set it in the extension options (right-click extension icon → Options)
- Currently using GPT-4.1 (can be modified in the code)

### System Instructions
You can customize how the AI assistant behaves by modifying the system instructions in the options page. Default configuration:

```
You are a helper that works inside a Google extension. Your function is to help the user answer clients and general people. Usually the screen will be some email thread or WhatsApp conversation. On the next message you'll have the markdown content of the page the user is seeing. Your function is to suggest text to be sent to the other end of the conversation. Just send me the answer that I should write, not any explanations or any other thing
```

## Advanced Features & Tips

### Cost Optimization
- The extension converts page content to markdown for processing
- Consider implementing website-specific content slicing for more cost-effective API usage
- Some websites might need custom handling for better conversation context

### Website-Specific Configurations
- Different websites might need different approaches for optimal results
- Consider customizing markdown conversion based on the website structure
- Some platforms might require specific content selection for better context

## Need Professional Help?

For consulting services or custom implementations, visit [verdit.site](https://verdit.site) or contact us through the website.

## Technical Details

- Uses GPT-4.1 by default (configurable in code)
- Chrome Extension Manifest V3
- Supports any text input field or contentEditable element
- Clipboard fallback for unsupported input methods

## Limitations

- Not available on Chrome Web Store
- Requires manual installation
- Needs OpenAI API key
- Cost depends on conversation length and API usage

## Support

For issues, feature requests, or custom implementations, please visit [verdit.site](https://verdit.site). 
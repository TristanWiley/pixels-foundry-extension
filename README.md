# Pixels Dice For Foundry VTT

A Chrome Extension for using the Pixels dice with Foundry Virtual Tabletop. This extension allows seamless integration of Pixels Smart Dice with Foundry VTT without needing a module or SSL certificate.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/pixels-dice-for-foundry.git
   cd pixels-dice-for-foundry
   ```

2. Install dependencies:

   ```sh
   yarn install
   ```

3. Build the project:

   ```sh
   yarn build
   ```

4. Load the extension in Chrome:
   - Open Chrome and navigate to .
   - Enable "Developer mode" using the toggle in the top right.
   - Click "Load unpacked" and select the directory.

## Usage

1. Open Foundry VTT in your browser.
2. Right click on the extension icon and go to "Options".
3. Connect your Pixels dice via Bluetooth, keep the options tab open!
4. Start rolling your dice and see the results directly in Foundry VTT.

## Development

### Scripts

- `yarn watch`: Watch for changes and rebuild the project in development mode.
- `yarn build`: Build the project for production.

### File Structure

- : Source files for the extension.
  - : Background script handling messages and events.
  - : Script injected into Foundry VTT to handle roll events.
  - : Script to inject into the Foundry VTT page.
  - : Script for the options page.
  - : Styles for the options page.
- : Compiled files for the extension.
- : Static files such as icons and HTML pages.
- : Webpack configuration files.

## Contribution

Suggestions and pull requests are welcomed! Please fork the repository and create a new branch for your feature or bug fix. Ensure your code follows the existing style and conventions.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

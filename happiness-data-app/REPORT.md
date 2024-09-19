## Introduction

For this assignment, the core app functionality I implemented is derived from a dynamically updated table grid component. The grid content changes based on user interactions such as selecting options and data filtering. To enhance the user experience, I developed a text input component with auto-complete and filtering capabilities which allows users to find information efficiently. I also used Bootstrap tab components as a way to organise the data and limit unnecessary API calls by only fetching data for the selected tab.

Additionally, I utilised the login, registration, and data API endpoints to handle authentication and retrieve data, respectively. Non-existent pages and errors are also handled appropriately using custom routing and UI alert messages. For the 'factors' endpoint, I implemented a way to show comparisons based on the average values of each happiness factor. While this gives the user some insight, I realise that this may not be the best or most effective method to visualise and compare the data.

## Use of Endpoints

%% In the design of my app, all data endpoints (rankings, countries, and factors) are technically accessible just by using the search bar component as explained below. %%

On initial page load, the user is prompted to search for a country with an optional year option. From text input in the country search bar, a suggestive auto-complete dialog appears to assist the user in finding a specific country. The list of countries available are retrieved from the provided '/countries' endpoint. This auto-complete component of the app is also used within other pages to enhance the user experience.

![[Pasted image 20240919190800.png]]

If only the year and no country is provided in the search bar, the '/rankings' endpoint is queried to show the all rankings of that given year with the matching tab label selected in black. Likewise, if the user searches with no input, the rankings for the latest year (2020) is displayed. A data filter is accessible below the table if the user wants to find a specific country, rank, or score within the data from the selected year.

![[Pasted image 20240918101805.png]]

The cells in the 'Country' column are clickable links which will query the '/rankings' endpoint and render the 'RankYear' component. This component shows the chosen country's rank for the whole year range. Similarly, the same component is rendered if the search bar only contains only a country.

![[Pasted image 20240918090600.png]]

From this page in the app, the cells in the 'Year' column are also clickable links which will conditionally show an alert or redirect to the '/factors' endpoint depending on whether the user is logged in. If the user is not logged in, and both country and year are provided in the search bar, the search will render the same page. However if the user is logged in, this will query the '/factors' endpoint with the given year and the country as the value for the data filter found below the table.

![[Pasted image 20240919190033.png]]

Using the provided user authentication endpoints, users can easily create and access their accounts by selecting the 'Log In' and 'Register' links from the navigation menu. Users are required to be logged in to access the 'Factors' page of the app. If a user is not logged in, an error message is rendered which reminds them to create or sign into their account.

![[Pasted image 20240919190024.png]]

## External Components

In my app, ag-grid-react and react-autocomplete-input is used to display the fetched data and filter through it, respectively. The React Bootstrap library is also utilised to create responsive components and page layouts. To handle the URL routing of the app react-router-dom was used.

## Technical description

The application is a Single Page App (SPA), built using React and employs the use of functional components, routing, custom hooks and state management. 'RankAll', 'RankCountry', and 'RankFactors' are the primary components responsible for rendering and managing the data for user interaction.

Components like 'GridTable', and 'QuickFilter' are used to render the table grid and provide data filtering capabilities. Additionally, custom components such as 'CountryCellRenderYears' and 'YearCellRenderFactors' components are integrated with 'ag-grid-react' in order to render table cells as dynamic routes to navigate the app.

Extensive manual testing was done to handle API integration, user flow and various errors. To simplify the user experience, nested routes and route redirects are implemented to guide users through various sections of the app.

![[Pasted image 20240919193906.png]]

Error handling is mostly managed by the 'NotFound' component which provides user feedback for non-existent routes and other errors. Below is an example of a rendered error page for users trying to access the Factors page without being logged in.

![[Clipboard - 2024-09-19 21.12.56 1.png]]

In conjunction with 'NotFound', the 'AlertMessage' component is also used in some routes in the app to provide user feedback without re-rendering the entire page.

![[Pasted image 20240919211844.png]]

This same component is also re-used in the 'Register' page to alert a successful registration attempt to the user:

![[Pasted image 20240919214402.png]]

### Results

As described prior, app usage is based on user interaction with the rendered table grid, and search and filter inputs. API calls and page routing are mostly handled by the rendered table cells or the 'GridYearTabs' component.

![[Pasted image 20240919204005.png]]

Using the 'QuickFilter' component, the table data can be manipulated by text input which also persists should the user select a different year.

Although there are various ways to display and limit data and API calls, I opted to use a client side text filtering feature (using the 'QuickFilter' component) to manage most of the comparative functionality. As an example in the usage of the '/factors' endpoint, instead of limiting the API call to a specific country and year as selected by the user, I chose to fetch data for the entire year and used the country input to filter the result on the client side. While this approach results in a longer initial load time compared to making multiple smaller fetch calls, the goal was to significantly reduce the perceived waiting times in the following interactions and provide the user with a broader dataset to explore and analyse in real time.

![[Pasted image 20240919204120.png]]

To assist with data analysis and comparison, I also implemented a feature which renders the background of each happiness factor cell to show whether the score is above (green) or below (red) average. This provides a visual cue in comparing each country's relative performance for each factor. Additionally, the happiness factor scores can also be numerically sorted by clicking the column headers, making it easier to compare the scores between multiple countries.

![[Pasted image 20240919204212.png]]

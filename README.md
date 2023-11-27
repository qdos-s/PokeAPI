API:
https://pokeapi.co/

Stack:
Node.js, React, GraphQL, Apollo Client, TypeScript

Create a full-stack app that shows list of pokemons.

Frontend:
- Main page:
    - show a list of pokemons with their name & image
    - list should be paginated
    - add support for sorting (default order / reversed order)
    - add support for searching
        - text search isn't available in PokeAPI, so searching will work only for fully-typed name (for example: `GET https://pokeapi.co/api/v2/pokemon/abomasnow/`)
    - click on a pokemon opens a Pokemon modal window
- Pokemon window:
    - Should show a pockemon name, id, image, height, weight, abilities, experience, types (see sample screenshot)
    - Feel free to style this window in any way you want, it just should show required fields

BE Architecture Requirements:
- Backend uses https://pokeapi.co/
- Server and client should communicate using GraphQL queries
- Queries & schemas should be placed in separate folder
- Return only necessary fields (those that are requested by the client)
- Support caching
- Feel free to use some libs for creating GraphQL server (like `express-graphql`)

FE Architecture Requirements:
- Queries & schemas should be placed in separate folder (for ex.: `queries`)
- Use hooks to fetch data
- Fetch only necessary fields
- Divide presentational and container components
- Show loaders when data is loading from the server
- Feel free to use any styling techniques you comfortable with

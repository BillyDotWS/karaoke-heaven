<%- include('/blocks/header.ejs', {bot, user, path}) %>
  <div class="jumbotron">
    <div>
      <h1><%= bot.user.username %> Dashboard</h1>
      <p class="lead"><% if(bot.application.description.length > 3) { %> <%= bot.application.description %> <% } else { %>No description given.<% }%></p>
      <p class="lead">
        <a class="btn btn-primary" href="/commands" role="button">Command Help »</a>
      </p>
    </div>
  </div>
<% include('/blocks/footer.ejs') %>

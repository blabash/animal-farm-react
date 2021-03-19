import * as React from 'react';
const API = 'https://api.ui.dev/hash-history-basketball-league';

const teams = ['bulls', 'foxes', 'hedgehogs', 'lemurs', 'koalas'];
const teamsPromises = teams.map((team) =>
  fetch(`${API}/team`, {
    method: 'POST',
    body: JSON.stringify({ team }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
);

export default function useTeams() {
  const [loading, setLoading] = React.useState(true);
  const [response, setResponse] = React.useState(null);

  React.useEffect(() => {
    async function fetchTeams() {
      try {
        const res = await Promise.all(teamsPromises);
        const data = await Promise.all(res.map((r) => r.clone().json()));
        const body = data.map(({ body }) => JSON.parse(body));
        setResponse(body);
        setLoading(false);
      } catch (error) {
        console.warn('error fetching team data', error);
      }
    }
    fetchTeams();
  }, ['foo', 'bar', 'baz']);

  return { response, loading };
}

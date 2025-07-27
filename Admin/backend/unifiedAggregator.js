import { fetchLucky7Data, fetchHuntsData, fetchTournamentsData } from './googleSheetsUnifiedSync.js';

export async function getUnifiedLeaderboard() {
  const lucky7Data = await fetchLucky7Data();
  const huntsData = await fetchHuntsData();
  const tournamentsData = await fetchTournamentsData();

  const users = new Map();

  // Merge Lucky7 data
  lucky7Data.forEach(l => {
    users.set(l.username, {
      username: l.username,
      lucky7: parseInt(l.points) || 0,
      hunts: { mega: 0, super: 0, player: 0, total: 0 },
      tournaments: { pvp: 0, slot: 0, total: 0 },
      total: parseInt(l.points) || 0
    });
  });

  // Merge Hunts data
  huntsData.forEach(h => {
    if (!users.has(h.username)) {
      users.set(h.username, {
        username: h.username,
        lucky7: 0,
        hunts: { mega: 0, super: 0, player: 0, total: 0 },
        tournaments: { pvp: 0, slot: 0, total: 0 },
        total: 0
      });
    }
    const u = users.get(h.username);
    u.hunts.mega = parseInt(h.mega) || 0;
    u.hunts.super = parseInt(h.super) || 0;
    u.hunts.player = parseInt(h.player) || 0;
    u.hunts.total = u.hunts.mega + u.hunts.super + u.hunts.player;
    u.total = u.lucky7 + u.hunts.total + u.tournaments.total;
  });

  // Merge Tournaments data
  tournamentsData.forEach(t => {
    if (!users.has(t.username)) {
      users.set(t.username, {
        username: t.username,
        lucky7: 0,
        hunts: { mega: 0, super: 0, player: 0, total: 0 },
        tournaments: { pvp: 0, slot: 0, total: 0 },
        total: 0
      });
    }
    const u = users.get(t.username);
    u.tournaments.pvp = parseInt(t.pvp) || 0;
    u.tournaments.slot = parseInt(t.slot) || 0;
    u.tournaments.total = u.tournaments.pvp + u.tournaments.slot;
    u.total = u.lucky7 + u.hunts.total + u.tournaments.total;
  });

  return Array.from(users.values()).sort((a, b) => b.total - a.total);
}

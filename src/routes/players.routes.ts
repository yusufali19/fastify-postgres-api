import { FastifyInstance, RouteOptions } from 'fastify';

import PlayerControllers from '../controllers/players.controllers';
import PlayerSchemas from '../schemas/players.schemas';

type TProvider = (
  fastify: FastifyInstance,
  options: RouteOptions,
  done: Function
) => void;

const allRoutes: RouteOptions[] = [
  {
    method: 'GET',
    url: '/players',
    schema: PlayerSchemas.GetPlayers,
    handler: PlayerControllers.getPlayers,
  },
  {
    method: 'GET',
    url: '/players/:id',
    schema: PlayerSchemas.GetPlayers,
    handler: PlayerControllers.getPlayerById,
  },
  {
    method: 'POST',
    url: '/player',
    schema: PlayerSchemas.GetPlayerById,
    handler: PlayerControllers.addPlayer,
  },
  {
    method: 'PUT',
    url: '/player/:id',
    schema: PlayerSchemas.UpdatePlayer,
    handler: PlayerControllers.updatePlayer,
  },
  {
    method: 'DELETE',
    url: '/player/:id',
    schema: PlayerSchemas.DeletePlayer,
    handler: PlayerControllers.deletePlayer,
  },
];

const PlayerRoutesProvider: TProvider = (fastify, _, done) => {
  allRoutes.forEach((r) => fastify.route(r));
  done();
};

export default PlayerRoutesProvider;

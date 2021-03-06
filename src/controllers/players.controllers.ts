import { FastifyRequest, FastifyReply } from 'fastify';
import fastifyInstance from '../server';

type THandler = (request: FastifyRequest, reply: FastifyReply) => void;

namespace PlayerControllers {
  export const addPlayer: THandler = (request, reply) => {
    const { name, club } = request.body as any;

    const dbQuery = 'INSERT INTO players (name, club) VALUES ($1, $2)';

    fastifyInstance.pg.query(dbQuery, [name, club], (err) => {
      if (err) throw Error();

      reply.send({ name, club });
    });
  };

  export const getPlayers: THandler = (_, reply) => {
    const dbQuery = 'SELECT * FROM players ORDER BY id ASC';

    fastifyInstance.pg.query(dbQuery, (err, result) => {
      if (err) throw Error();

      reply.send(result.rows);
    });
  };

  export const getPlayerById: THandler = (request, reply) => {
    const { id } = request.params as any;
    const dbQuery = 'SELECT * FROM players WHERE id = $1';

    fastifyInstance.pg.query(dbQuery, [id], (err, result) => {
      if (err) throw Error();

      reply.send(result.rows);
    });
  };

  export const updatePlayer: THandler = (request, reply) => {
    const { id } = request.params as any;
    const { name, club } = request.body as any;

    const dbQuery = 'UPDATE players SET name = $1, club = $2 WHERE id = $3';

    fastifyInstance.pg.query(dbQuery, [name, club, id], (err) => {
      if (err) throw Error();

      reply.send('Player details updated successfully.');
    });
  };

  export const deletePlayer: THandler = (request, reply) => {
    const { id } = request.params as any;

    const dbQuery = 'DELETE FROM players WHERE id = $1';

    fastifyInstance.pg.query(dbQuery, [id], (err) => {
      if (err) throw Error();

      reply.send(`Player with ID: ${id} deleted successfully.`);
    });
  };
}

export default PlayerControllers;

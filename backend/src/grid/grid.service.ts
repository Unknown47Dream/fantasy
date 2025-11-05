import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLClient, gql } from 'graphql-request';
import {
  Title,
  TitlesResponse,
  // Tournament,
  // TournamentsResponse,
} from '../common/interfaces/grid';

@Injectable()
export class GridService {
  private readonly logger = new Logger(GridService.name);
  private client: GraphQLClient;

  constructor(private readonly configService: ConfigService) {
    const endpoint = this.configService.get<string>('GRID_CENTRAL_GQL');
    const apiKey = this.configService.get<string>('GRID_API_KEY');
    if (!endpoint || !apiKey) {
      throw new Error('GRID_CENTRAL_GQL and GRID_API_KEY must be set in env');
    }
    this.client = new GraphQLClient(endpoint, {
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
    });
  }

  async getTitles(): Promise<TitlesResponse> {
    const query = gql`
      query GetTitles {
        titles {
          id
          name
        }
      }
    `;

    try {
      const data = await this.client.request<TitlesResponse>(query);
      return data;
    } catch (err) {
      this.logger.error('GRID getTitles query failed', err);
      throw err;
    }
  }

  async getTitleById(id: string): Promise<{ title: Title }> {
    const query = gql`
      query GetTitleById($id: ID!) {
        title(id: $id) {
          id
          name
        }
      }
    `;

    try {
      const data = await this.client.request<{ title: Title }>(query, { id });
      return data;
    } catch (err) {
      this.logger.error(`GRID getTitleById query failed for ID: ${id}`, err);
      throw err;
    }
  }

  // async getTournaments(titleId?: string, limit: number = 10): Promise<any> {
  //   // Query to get tournaments - simplified version first
  //   const query = gql`
  //     query GetTournaments {
  //       tournaments {
  //         id
  //         name
  //       }
  //     }
  //   `;

  //   try {
  //     this.logger.log(
  //       `Querying Grid.gg for tournaments (titleId: ${titleId}, limit: ${limit})...`,
  //     );
  //     const data = await this.client.request<any>(query);
  //     this.logger.log(`Successfully retrieved tournaments from Grid.gg`);
  //     return data;
  //   } catch (err) {
  //     this.logger.error('GRID getTournaments query failed', err);
  //     throw err;
  //   }
  // }
}

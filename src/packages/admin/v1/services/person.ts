import { Knex } from "knex";
import { IPaginationResponse, IReponseServiceFn } from "../../../../types";
import { IUserSearchQuery, TUser } from "../../../../types/user";
import pagination from "../../../../lib/pagination";
import { clearSearch } from "../../../../lib/utils";

export default class PersonService {
    static async list(query: IUserSearchQuery) {
        const $extra = { page: query.page, limit: query.limit, isAll: query.isAll }
        const response: IReponseServiceFn<TUser> = { data: [], status: false, ...$extra };
        try {
            const search = {
                id: parseInt(query.id as string) ? parseInt(query.id as string) : '',
            }
            clearSearch(search)

            const dbQuery = knexInstance.select(['name', 'email', 'id'])
                .from('persons')
                .where(search)

            dbQuery.orderBy('id', 'desc')
            const result: IPaginationResponse<TUser> = await pagination<TUser>(dbQuery, $extra);
            response.data = result.data;
            response.extra = result.extra
            response.status = true;
            return response;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    static async save(data: { name: string, email: string, id?: number | string }, trx: Knex.Transaction) {
        const response: IReponseServiceFn<number | null> = { data: null, status: false };
        try {
            const docValues = {
                email: data.email,
                name: data.name
            }
            let doc = (data.id) ? await trx('persons').where({ id: (data.id) }).first() : null;
            if (doc) {
                await trx('persons')
                    .where({ id: data.id })
                    .update(docValues);

                doc = data.id;
            } else {
                const inserted = await trx('persons')
                    .insert(docValues)
                console.log(inserted)
                doc = inserted;
            }
            response.data = doc;
            response.status = true;
            return response;
        } catch (err: any) {
            throw new Error(err);
        }
    }
    static async delete(data: { ids: number | number[] }, trx: Knex.Transaction) {
        const response: IReponseServiceFn<number | null> = { data: null, status: false };

        try {
            const idsToDelete = Array.isArray(data.ids) ? data.ids : [data.ids];

            const deletedCount = await trx('persons')
                .whereIn('id', idsToDelete)
                .del();

            response.status = deletedCount > 0 ? true : false;
            return response;
        } catch (err: any) {
            throw new Error(err);
        }
    }

}
export class FiltersService {
    public browsePageFilters(params: any) {
        return {
            page: parseInt(params["page"] as string) || 1,
            tags: Array.isArray(params["tags"]) ? params["tags"] : [],
        };
    }
}

export default new FiltersService();

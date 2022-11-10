import type { ItemRepository } from './itemRepository';

class ItemService {
  itemRepository;

  constructor(itemRepository: ItemRepository) {
    this.itemRepository = itemRepository;
  }
}

export default ItemService;

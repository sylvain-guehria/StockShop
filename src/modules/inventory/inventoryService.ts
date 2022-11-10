import type { InventoryRepository } from './inventoryRepository';

class InventoryService {
  inventoryRepository;

  constructor(inventoryRepository: InventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }
}

export default InventoryService;

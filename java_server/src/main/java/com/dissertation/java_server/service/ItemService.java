package com.dissertation.java_server.service;

import com.dissertation.java_server.jpa.entity.Item;
import com.dissertation.java_server.jpa.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    private final ItemRepository repository;

    @Autowired
    public ItemService(ItemRepository repository) {
        this.repository = repository;
    }

    public List<Item> findAllItems() {
        return repository.findAll();
    }

    public List<Item> getItemsForTenant(String tenant) {
        return repository.findByTenant(tenant);
    }

    public Item saveItem(Item item) {
        return repository.save(item);
    }
}

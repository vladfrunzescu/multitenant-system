package com.dissertation.java_server.jpa.repository;

import com.dissertation.java_server.jpa.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    @Query(value = "SELECT * FROM item "
            + "WHERE tenant_specific_attributes ->> 'tenant' = :tenant",
            nativeQuery = true)
    List<Item> findByTenant(@Param("tenant") String tenant);
}

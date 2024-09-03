package com.dissertation.java_server.jpa.entity;

import com.dissertation.java_server.utils.JpaConverterJson;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnTransformer;

import java.math.BigDecimal;
import java.util.Map;

@Entity
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "image_link")
    private String imageLink;

    @Convert(converter = JpaConverterJson.class)
    @Column(name = "tenant_specific_attributes", columnDefinition = "jsonb")
    @ColumnTransformer(write = "?::jsonb")
    private Map<String, Object> tenantSpecificAttributes;
}

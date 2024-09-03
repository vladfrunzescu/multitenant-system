package com.dissertation.java_server.config;

import com.dissertation.java_server.tenant_management.MultiTenantDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import liquibase.integration.spring.SpringLiquibase;

import jakarta.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

@Configuration
public class DataSourceConfig {

    @Autowired
    private Environment env;

    @Bean
    @Primary
    public DataSource dataSource() {
        AbstractRoutingDataSource dataSource = new MultiTenantDataSource();

        Map<Object, Object> targetDataSources = new HashMap<>();
        targetDataSources.put("e-food", createDataSource("tenants.e-food.datasource"));
        targetDataSources.put("e-market", createDataSource("tenants.e-market.datasource"));

        dataSource.setDefaultTargetDataSource(defaultDataSource());
        dataSource.setTargetDataSources(targetDataSources);

        return dataSource;
    }

    private DataSource defaultDataSource() {
        return DataSourceBuilder.create()
                .url(env.getProperty("spring.datasource.url"))
                .username(env.getProperty("spring.datasource.username"))
                .password(env.getProperty("spring.datasource.password"))
                .driverClassName(env.getProperty("spring.datasource.driver-class-name"))
                .build();
    }

    private DataSource createDataSource(String prefix) {
        return DataSourceBuilder.create()
                .url(env.getProperty(prefix + ".url"))
                .username(env.getProperty(prefix + ".username"))
                .password(env.getProperty(prefix + ".password"))
                .driverClassName(env.getProperty(prefix + ".driver-class-name"))
                .build();
    }

    @Bean
    @Primary
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource) {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource);
        em.setPackagesToScan("com.dissertation.java_server.jpa.entity");

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        em.setJpaProperties(hibernateProperties());

        return em;
    }

    private Properties hibernateProperties() {
        Properties properties = new Properties();
        properties.put("hibernate.dialect", env.getProperty("spring.jpa.properties.hibernate.dialect"));
        properties.put("hibernate.show_sql", env.getProperty("spring.jpa.show-sql"));
        return properties;
    }

    @Bean
    @Primary
    public PlatformTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManagerFactory);
        return transactionManager;
    }

    @Bean
    @ConfigurationProperties("tenants.e-food.liquibase")
    public LiquibaseProperties efoodLiquibaseProperties() {
        return new LiquibaseProperties();
    }

    @Bean
    public SpringLiquibase efoodLiquibase() {
        return springLiquibase(createDataSource("tenants.e-food.datasource"), efoodLiquibaseProperties());
    }

    @Bean
    @ConfigurationProperties("tenants.e-market.liquibase")
    public LiquibaseProperties emarketLiquibaseProperties() {
        return new LiquibaseProperties();
    }

    @Bean
    public SpringLiquibase emarketLiquibase() {
        return springLiquibase(createDataSource("tenants.e-market.datasource"), emarketLiquibaseProperties());
    }

    @Bean
    @ConfigurationProperties("spring.datasource.liquibase")
    public LiquibaseProperties defaultLiquibaseProperties() {
        return new LiquibaseProperties();
    }

    @Bean
    public SpringLiquibase defaultLiquibase() {
        return springLiquibase(defaultDataSource(), defaultLiquibaseProperties());
    }

    private static SpringLiquibase springLiquibase(DataSource dataSource, LiquibaseProperties properties) {
        SpringLiquibase liquibase = new SpringLiquibase();
        liquibase.setDataSource(dataSource);
        liquibase.setChangeLog(properties.getChangeLog());
        liquibase.setContexts(properties.getContexts());
        liquibase.setDefaultSchema(properties.getDefaultSchema());
        liquibase.setDropFirst(properties.isDropFirst());
        liquibase.setShouldRun(properties.isEnabled());
//        liquibase.setLabels(properties.getLabels());
        liquibase.setChangeLogParameters(properties.getParameters());
        return liquibase;
    }
}

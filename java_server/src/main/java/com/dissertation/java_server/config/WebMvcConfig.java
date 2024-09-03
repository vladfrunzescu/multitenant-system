package com.dissertation.java_server.config;

import com.dissertation.java_server.tenant_management.TenantInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Autowired
    private TenantInterceptor tenantInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(tenantInterceptor);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/send")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET")
                .allowCredentials(true);

        registry.addMapping("/api/data")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET")
                .allowCredentials(true);

        registry.addMapping("/login")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST")
                .allowCredentials(true);

        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);

//        registry.addMapping("/**") // Apply globally to all endpoints
//                .allowedOrigins("http://localhost:4200")
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
//                .allowCredentials(true); // If cookies or authorization headers are used
    }
}

package com.dissertation.java_server.tenant_management;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
@Component
public class TenantInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String tenantId = request.getHeader("X-TenantID"); // Extract tenant ID from the header
        if (tenantId != null) {
            log.info("Setting tenant {} from request", tenantId);
            TenantContext.setCurrentTenant(tenantId);
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return false; // Reject the request if tenant ID is not present
        }
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        TenantContext.clear(); // Clear the tenant context after the request is processed
    }
}

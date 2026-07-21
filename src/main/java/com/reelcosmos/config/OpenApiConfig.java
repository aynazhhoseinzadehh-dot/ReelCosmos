package com.reelcosmos.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI reelCosmosOpenAPI() {

        return new OpenAPI()

                .info(new Info()

                        .title("ReelCosmos API")

                        .description("Movie Tracking & Recommendation Platform API")

                        .version("1.0.0")

                        .contact(new Contact()
                                .name("ReelCosmos")
                                .email("support@reelcosmos.com"))

                        .license(new License()
                                .name("MIT")
                                .url("https://opensource.org/licenses/MIT")))

                .externalDocs(new ExternalDocumentation()
                        .description("Project Documentation")
                        .url("https://github.com/"));
    }

}

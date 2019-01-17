Feature: Main page behaviors
  The main page defines the main functionalities of the app

  Background:
    Given the user is on the main page

  Scenario: The page loads and shows the brand logo
    When the page is loaded
    Then the brand on the navbar says "Skyscraper"

  Scenario: Comparing 2 cars
    When the user types in
    | https://www.hasznaltauto.hu/szemelyauto/mercedes-benz/c_250/mercedes-benz_c_250_t_bluetec_d_4matic_automata-13808437 | https://www.hasznaltauto.hu/szemelyauto/audi/a8/audi_a8_3_0_v6_tdi_quattro_tiptronic_ic_afas-13688109 |
    And clicks the compare button
    Then after some time, a datatable should appear with
    | Név & link          | Évjárat    | Ár              | Futott kilóméterek  | Teljesítmény  | Érték  |
    | Link neve           | 2016/9     | 13 900 000 Ft   | 61 609 km           | 193 kW        | 27.79  |
    | Link neve           | 2015/3     | 8 290 000 Ft    | 85 000 km           | 150 kW        | 22.71  |
